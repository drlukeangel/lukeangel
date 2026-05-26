---
title: "Building A Distributed Mesh in Rust"
summary: "I wanted to feel where an iroh-based P2P mesh breaks at small scale before betting a real product on it. Five weeks of building, breaking, and fixing — first 18 nodes pegged an 80-core box at 100% CPU. Five weeks later, the same 18 nodes idled at 5%, with every step measured. This notebook is the work as it happened — the wrong hypotheses, the flamegraphs, the bugs nobody warns you about when you wire iroh-gossip into a long-running process."
accent: "#b7410e"
cover: "../../assets/blog/building-a-distributed-mesh-in-rust-cover.svg"
coverAlt: "A loose mesh of small nodes around two larger rust-orange hub nodes, connected by thin spokes, with a single dashed bridge link crossing through an intermediate ring node. Cream background, faint dot grid, vertical rust-orange accent bar at the left edge."
---

I wanted to know what it actually costs to run a self-organizing P2P mesh on commodity hardware. The substrate is the long-running need underneath bigger Rafka work — Kafka-protocol-compatible event streaming over a NAT-traversing iroh fabric. Before the app layer made sense, I needed to know whether the substrate itself was sound. So I built it small and ran it hard.

The first canary pegged an 80-core box at 100% CPU with 18 nodes idling. Five weeks of measuring, hypothesizing, and being wrong got it down to 5% — competitive with an idle Bitcoin node. The bugs that ate the CPU weren't in iroh. They were in places I'd written `tokio::spawn(...)` without thinking about who owned the resulting tasks.

This notebook is the work as it happened, in order — five posts, ending with the kit going open source.
