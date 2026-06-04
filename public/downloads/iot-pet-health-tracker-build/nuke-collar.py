"""
Send a factory-reset admin message to the collar via the Meshtastic Python
library directly. Works around a bug in meshtastic-cli 2.7.8 where the
--factory-reset flag passes a bool to a protobuf int field and aborts.
"""
import sys
import time

import meshtastic.serial_interface
from meshtastic.protobuf import admin_pb2

PORT = "COM5"


def main():
    print(f"Opening {PORT}...")
    iface = meshtastic.serial_interface.SerialInterface(devPath=PORT)
    time.sleep(2)

    adm = admin_pb2.AdminMessage()
    adm.factory_reset_config = 1

    print("Sending factory_reset_config=1 admin message...")
    iface.localNode._sendAdmin(adm)
    time.sleep(3)

    print("Sent. Collar should reboot to factory defaults in 10 seconds.")
    iface.close()


if __name__ == "__main__":
    main()
