# GenAI System Design Case Studies

This directory contains original, interview-oriented HLD case studies for common generative AI products. Each design includes requirements, architecture, request flow, model/data choices, scaling, evaluation, safety, failure modes and portfolio extensions.

## Case study catalog

| # | Design | Main system-design focus |
|---|---|---|
| 01 | [Gmail Smart Compose](../system_designs/genai/gmail-smart-compose/README.md) | Low-latency completion, confidence gating, privacy-aware feedback |
| 02 | [Google Translate](../system_designs/genai/google-translate/README.md) | Language-pair routing, translation quality, document jobs |
| 03 | [ChatGPT: Personal Assistant Chatbot](../system_designs/genai/personal-assistant-chatbot/README.md) | Conversation state, context, tools, approval and memory |
| 04 | [Image Captioning](../system_designs/genai/image-captioning/README.md) | VLM serving, grounding, image preprocessing and evaluation |
| 05 | [Retrieval-Augmented Generation](../system_designs/genai/retrieval-augmented-generation/README.md) | Ingestion, hybrid retrieval, ACL, citations and freshness |
| 06 | [Realistic Face Generation](../system_designs/genai/realistic-face-generation/README.md) | Synthetic identity generation, dataset governance and safety |
| 07 | [High-Resolution Image Synthesis](../system_designs/genai/high-resolution-image-synthesis/README.md) | Staged refinement, tiling, GPU memory and artifact control |
| 08 | [Text-to-Image Generation](../system_designs/genai/text-to-image-generation/README.md) | Diffusion serving, conditioning, safety and GPU scheduling |
| 09 | [Personalized Headshot Generation](../system_designs/genai/personalized-headshot-generation/README.md) | Consent, per-user adaptation, private storage and deletion |
| 10 | [Text-to-Video Generation](../system_designs/genai/text-to-video-generation/README.md) | Expensive async jobs, temporal coherence, staged encoding |

## Common interview framework

1. Clarify product scope, inputs/outputs, users, latency and safety requirements.
2. Frame the ML task and identify the model family; do not start with model brand names.
3. Separate data preparation/training from online serving.
4. Draw the request path and asynchronous data/training path.
5. Define API contracts, state, storage, model/version metadata and idempotency.
6. Estimate workload and identify GPU/CPU/network bottlenecks.
7. Define offline and online evaluation, slice metrics and rollout gates.
8. Address privacy, safety, provenance, deletion and failure recovery.
9. Explain trade-offs and propose a phased portfolio implementation.

## References and attribution

- [ByteByteGo — Gmail Smart Compose](https://bytebytego.com/courses/genai-system-design-interview/gmail-smart-compose)
- [ByteByteGo — GenAI System Design Interview overview](https://bytebytego.com/courses/genai-system-design-interview/introduction-and-overview)
- [ByteByteGo — Generative AI System Design Interview book overview and chapter list](https://blog.bytebytego.com/p/our-new-book-generative-ai-system)
- Research papers and technical references are linked in each case study.

The diagrams and explanatory text in this repository are original. ByteByteGo is credited as a learning reference; proprietary course figures and text are not reproduced.