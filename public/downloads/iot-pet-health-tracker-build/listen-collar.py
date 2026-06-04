"""
Listen to a Meshtastic base station over USB serial and log incoming packets
from the collar to a CSV file in the same column layout as the firmware's
built-in rangetest.csv export.

Distance is computed per-packet from the sender's broadcast lat/lng to the
base's MANUAL fixed coordinate below — so distance is correct even when the
base's own nodedb position is stale.
"""
import csv
import math
import os
import sys
import time
from datetime import datetime

from pubsub import pub
import meshtastic.serial_interface

PORT = "COM7"
COLLAR_ID = 1159022031          # !451545cf
BASE_LAT = 40.27438             # manual coord, set via meshtastic --setlat
BASE_LON = -75.61483
BASE_ELEV = 30
OUT_CSV = r"C:\_dev\luke-angel-co\public\downloads\iot-pet-health-tracker-build\walk-live.csv"

HEADER = ['date', 'time', 'from', 'sender name', 'sender lat', 'sender long',
          'rx lat', 'rx long', 'rx elevation', 'rx snr', 'distance(m)',
          'hop limit', 'payload']


def haversine_m(lat1, lon1, lat2, lon2):
    R = 6371000.0
    p1 = math.radians(lat1)
    p2 = math.radians(lat2)
    dp = math.radians(lat2 - lat1)
    dl = math.radians(lon2 - lon1)
    a = math.sin(dp / 2) ** 2 + math.cos(p1) * math.cos(p2) * math.sin(dl / 2) ** 2
    return 2 * R * math.asin(math.sqrt(a))


def on_receive(packet, interface):
    try:
        if packet.get('from') != COLLAR_ID:
            return
        decoded = packet.get('decoded', {}) or {}
        portnum = decoded.get('portnum', '')
        now = datetime.now()
        date_s = now.strftime('%Y-%m-%d')
        time_s = now.strftime('%H:%M:%S')

        slat = ''
        slng = ''
        dist = ''
        pos = decoded.get('position') or {}
        if 'latitudeI' in pos and 'longitudeI' in pos:
            slat = pos['latitudeI'] / 1e7
            slng = pos['longitudeI'] / 1e7
            dist = round(haversine_m(slat, slng, BASE_LAT, BASE_LON))

        snr = packet.get('rxSnr', '')
        hop = packet.get('hopLimit', '')

        if portnum == 'TEXT_MESSAGE_APP':
            payload = decoded.get('text', '')
        else:
            payload = f'<{portnum}>' if portnum else ''

        row = [date_s, time_s, packet.get('from'), 'Collar',
               slat, slng, BASE_LAT, BASE_LON, BASE_ELEV,
               snr, dist, hop, payload]

        d_str = f'{dist}m' if dist != '' else '----'
        s_str = f'snr={snr:+.2f}' if isinstance(snr, (int, float)) else f'snr={snr}'
        coord = f'({slat:.5f},{slng:.5f})' if slat != '' else '(no fix)'
        print(f'{time_s} | {payload:<24s} | hop={hop} | {s_str} | {d_str:>7s} | {coord}',
              flush=True)

        with open(OUT_CSV, 'a', newline='', encoding='utf-8') as f:
            csv.writer(f, quoting=csv.QUOTE_ALL).writerow(row)
    except Exception as e:
        print(f'[err] {e}', flush=True)


def on_connection(interface, topic=pub.AUTO_TOPIC):
    print(f'Connected to base on {PORT}. Listening for collar {COLLAR_ID}.',
          flush=True)


def main():
    if not os.path.exists(OUT_CSV):
        with open(OUT_CSV, 'w', newline='', encoding='utf-8') as f:
            csv.writer(f, quoting=csv.QUOTE_ALL).writerow(HEADER)

    pub.subscribe(on_receive, 'meshtastic.receive')
    pub.subscribe(on_connection, 'meshtastic.connection.established')

    iface = meshtastic.serial_interface.SerialInterface(devPath=PORT)
    print(f'Writing to {OUT_CSV}', flush=True)
    print('Ctrl+C to stop.', flush=True)

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print('Stopping.', flush=True)
    finally:
        iface.close()


if __name__ == '__main__':
    main()
