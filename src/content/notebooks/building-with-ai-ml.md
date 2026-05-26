---
title: "Building with AI/ML — Products & Operations"
summary: "Bedrock went GA in the fall of 2023, and within a few months the team had a live feature running on it. Three years on it's an agent stack in production, a prompt-regression set that catches drift before customers do, and a quarterly spend audit that keeps the bill honest. The running log of getting AI/ML into real products — and building the operations to run it without lighting money on fire."
accent: "#4f46b8"
cover: "../../assets/blog/building-with-ai-ml-cover.svg"
coverAlt: "A model at the center — drawn as a small neural-net graph — fed by an operations pipeline on one side and serving a product on the other, with a dashed feedback loop returning from the product back to the pipeline."
---

Every team's first AI/ML project is a demo. The hard part — the part nobody live-streams — is the second mile: getting a model into a product a customer actually touches, then building the operations to keep it honest after launch.

This notebook is the running log of that second mile. It starts the week Bedrock went GA and runs through a production agent stack — Agents, then AgentCore, then Strands — alongside the unglamorous machinery that makes any of it ship: a prompt-regression test set that catches drift before a customer does, SageMaker pipelines, the Lambda-vs-Fargate-vs-ECS call, and the quarterly spend audit that keeps an AI bill from quietly tripling.

Two threads run through all of it: **AI/ML in the product** — what the customer sees — and **AI/ML in the operations** — the pipelines, tests, and cost discipline that keep it running. Neither ships without the other. This is what I learned building both.
