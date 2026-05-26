---
title: "Knowledge Bases for Bedrock in production — the gotchas list"
date: 2025-02-25T09:46:00-05:00
category: tools
tags:
  - bedrock
  - aws
  - rag
  - llms
  - ai
  - knowledge-bases
excerpt: "Seven months running Bedrock Knowledge Bases in production. Five things the docs don't tell you, three workarounds that earned their keep, and one place I'd still build my own."
pullquote: "Managed RAG is 80% of the work. The other 20% is most of the production headaches."
notebook: building-with-ai-ml
notebookOrder: 7
cover: "../../assets/blog/bedrock-knowledge-bases-gotchas-cover.svg"
coverAlt: "A managed retrieval pipeline drawn left to right — documents chunked, embedded into vectors, retrieved, and answered — with small warning markers sitting on the chunking, retrieval-filter, sync, and re-ingest steps where the production gotchas live."
---

We moved a customer-facing retrieval feature onto Knowledge Bases for Amazon Bedrock last July. The service itself had been GA since re:Invent 2023 — we just sat on it for the better part of a year, watching other people find the sharp edges before we trusted our own retrieval to it. It's been seven months since we made the jump. The feature is in production, our team has stopped maintaining the homegrown RAG pipeline we replaced, and most days the managed version is better than what we had.

Most days. Not every day. Here's the list of production gotchas we've collected, the workarounds we landed on, and the one place I'd still build my own.

## Five things the docs don't tell you

Knowledge Bases runs the whole RAG pipeline for you — your docs in S3 get chunked, embedded into vectors, indexed, then retrieved and fed to a model at query time. That's the pitch, and it's real. The gotchas all live at the seams: where you chunk, where you retrieve and filter, when the source syncs, and what it costs to change your mind and re-ingest.

![The managed RAG pipeline Knowledge Bases runs, drawn in two rows with the five gotchas marked. The ingest row: an S3 source of your documents feeds a chunk step, then an embed step, then the vector store (OpenSearch Serverless), with a dashed re-ingest loop arcing from the store back to chunking — labelled as a roughly four-hour, costly rebuild whenever you change chunking or embedding settings (gotcha 4). A clock marker on the S3-to-chunk feed flags the eventually-consistent data-source sync that can lag hours (gotcha 5). A warning marker on the chunk step flags that chunking strategy is the dominant quality knob (gotcha 1). The query row: a user query with an optional metadata filter goes to a retrieve-top-K step (dense or hybrid, then filter), then to generate, then a grounded answer to the customer; a warning marker on retrieve flags that hybrid search is opt-in (gotcha 2) and that the metadata filter is applied after retrieval (gotcha 3).](../../assets/blog/kb-gotchas-managed-pipeline.svg)

**One: chunking strategy is *the* knob.** The default fixed-size chunker (300 tokens, 20% overlap) is fine for prose-heavy docs. For our docs — a mix of API references, code samples, and tutorial narrative — it was *terrible*. Code samples got cut mid-function; API parameter tables got split across chunks. Retrieval quality looked random until we switched to hierarchical chunking and added semantic chunking for the prose sections.

The lesson: **eval before you trust the defaults**. Run a fixed eval set against three chunking strategies before committing. You'll save yourself two months of "why is retrieval mediocre."

![One document — prose, a code sample, and an API parameter table — run through two chunkers side by side. On the left, the fixed-size default (300 tokens, 20% overlap): red dashed chunk boundaries fall wherever the token count runs out, slicing through the middle of the code sample's function and splitting the parameter table across two chunks, so neither is retrievable as a complete unit. On the right, hierarchical plus semantic chunking: the prose paragraph, the whole function, and the whole table each land in their own chunk intact, each marked with a green check. Same corpus, two strategies; the default cut units mid-way while the structure-aware one kept each unit whole.](../../assets/blog/kb-gotchas-chunking.svg)

**Two: hybrid search is opt-in and you absolutely want it.** The default retrieval mode is dense vector search. For queries with specific identifiers, error codes, or product SKUs, dense search alone misses recall — the model has never seen `E014_OVERTORQUE` and doesn't know it should be treated as a literal. The hybrid mode (which landed for OpenSearch Serverless back in spring 2024, before we'd even adopted KB) combines lexical (BM25) and vector retrieval. We turned it on six weeks in and recall on the "exact code lookup" class of queries jumped from 60% to 95%.

**Three: metadata filters are powerful but quietly limited.** You can attach metadata to each chunk at ingest and filter on it at retrieval time. Useful. The gotcha: filters are evaluated *after* the initial retrieval, so if your filter is restrictive (e.g., `product == 'X'` when only 5% of the KB is about product X), you can get back zero results because the top-K dense matches were all about other products. The workaround: increase the retrieve count substantially before filtering, or shard the KB by major dimension.

![Two paths showing why metadata filter order matters. On the left, the trap: retrieve a small top-5 by similarity, then apply a restrictive filter product equals X — but none of the top-5 happened to be product X, so the filter yields zero matches and an empty result set, marked with a red cross. On the right, the fix: over-retrieve to top-50 by similarity so the chunks that match product X are now inside the candidate set, then apply the same product-equals-X filter, which now returns usable results, marked with a green check. The caption notes the filter runs after retrieval, so a narrow filter needs a wide retrieve, or you shard the knowledge base by that dimension.](../../assets/blog/kb-gotchas-filter-order.svg)

**Four: re-ingest is your worst-case operation.** Modifying chunking or embedding settings requires re-ingesting the whole KB. For a small KB this is fine. For ours (40K documents, mixed sources) it takes about four hours and costs a few hundred dollars in embedding calls. *Plan for this*. We have one engineer's day per quarter budgeted to "re-ingest after settings change."

**Five: the data-source sync is eventually consistent on the order of *hours*.** When you upload new content to the S3 bucket backing the KB, the docs say "sync the data source." That sync is not instant. For a few thousand docs it's about 15 minutes. For larger updates we've seen it take over an hour. Don't write code that assumes "uploaded the file, next query returns it." It won't.

## Three workarounds that earned their keep

**A custom retrieve-then-rerank step.** The managed retrieval is OK, but for most of our run there was no managed *reranking* — so we built our own. We added a small Lambda that retrieves 20 chunks via the KB API, then reranks with a cheaper Bedrock model (Nova Micro now; was Haiku before) before passing the top 5 to the answering model. This added ~250 ms of latency and improved answer quality enough that our eval scores went up 8% on the harder categories.

AWS shipped a managed Rerank API at re:Invent in December — you flip on a reranker model (Amazon Rerank 1.0 or Cohere Rerank 3.5) right in the `Retrieve` / `RetrieveAndGenerate` call, no Lambda. I'm evaluating it against our hand-rolled step now. Early read: the managed reranker is competitive on quality and obviously less code, but our custom step uses a cheap *generative* model and lets us inject a little task-specific instruction into the ranking that a dedicated reranker model doesn't take. I haven't decided. If the managed numbers hold, I'll happily delete the Lambda — getting out of the plumbing business is the whole point.

**Per-query retrieval count.** Some questions are narrow ("what's the parameter for X"); some are broad ("give me an overview of Y"). We added a small classifier (one more Bedrock call) that picks K = 3 for narrow questions and K = 10 for broad ones. Cost: trivial. Quality: noticeable.

**A separate "fact" KB and "narrative" KB.** Our docs include both reference material (facts) and tutorials (narrative). Mixing them in one KB hurt — retrieval would pull tutorial paragraphs when the question wanted an exact parameter. We split them into two KBs and route queries to one or the other (or both) based on the classifier above. Better separation of concerns, easier to evolve independently.

## The one place I'd still build my own

**Multi-step retrieval over structured data.** Knowledge Bases got structured-data support at re:Invent last December — KBs can now answer questions over SQL-shaped data by generating queries. We tried it. For our use case (joins across more than two tables, with business-rule filters layered on), the generated SQL was hit-or-miss and the round-trip latency was too high.

We're still maintaining our own structured-data pipeline (Glue catalog → Athena → schema-aware prompt to a Bedrock model). It's more code than the managed version would be, but the quality is materially better. I'd revisit if AWS improves the structured-data path in the next six months.

## What changed last week

Claude 3.7 Sonnet dropped yesterday and is already available in Bedrock. We tested it against our eval set this morning. Mixed — better on multi-step reasoning, comparable on retrieval-grounded Q&A (which is what KB feeds). For our RAG feature, we'll stay on 3.5 Sonnet for now. For the agent feature (different post), 3.7 looks like an upgrade.

DeepSeek-R1, which dropped last month and made every news cycle, isn't on Bedrock yet but is available via Bedrock Marketplace. Worth watching; the cost shape is genuinely different from anything else available.

## The bigger lesson

Managed services give you the 80% case quickly and force you to *understand* the system better to handle the remaining 20%. Before we used Knowledge Bases, we maintained 1,200 lines of RAG plumbing and pretended we understood it. After: 0 lines of plumbing, much deeper understanding of chunking, retrieval modes, and reranking — because the gotchas are now *the only thing left to think about*.

![The build-versus-managed boundary, as two columns. The left column, "KB runs this — zero lines of plumbing," lists the pieces now fully managed: chunking and embedding, vector store and index lifecycle, dense and hybrid retrieval, metadata filtering at query time, and grounded answer generation — plus reranking shown half-filled as newly managed since December and still under evaluation. A note: was 1,200 lines of RAG plumbing, now none. The right column, "we still build this," lists the custom workarounds the team kept: a retrieve-then-rerank Lambda using a cheap generative model for task-specific ranking, a per-query K classifier (K=3 narrow, K=10 broad), a split fact-KB / narrative-KB with routing, and — marked in red as the one place to still build your own — a structured-data pipeline of Glue to Athena to a schema-aware prompt. A note: these are the quality knobs the managed path doesn't reach yet.](../../assets/blog/kb-gotchas-build-vs-managed.svg)

I'd take that trade again. Managed RAG isn't the whole product. It's the thing that gets you out of the plumbing business so you can argue about the actual quality knobs.

Six months from now I'll have moved one or two of the workarounds onto whatever AWS ships in mid-2025. The list will look different. The discipline won't.
