# Data Model — Netflix-Style Streaming

| Entity | Fields | Notes |
|---|---|---|
| Title | id, metadata, availability_window, region | Catalog aggregate |
| Episode | id, series_id, sequence | Series hierarchy |
| Profile | id, account_id, maturity_settings | Personalization scope |
| Entitlement | account_id, plan, region, status, version | Authorization source |
| Manifest | title_id, content_version, object_key, codecs | Immutable published manifest |
| PlaybackSession | id, profile_id, device_id, title_id, state, expires_at | Session lifecycle |
| Progress | profile_id, title_id, position_ms, version | Resume |
| LicenseRequest | id, session_id, drm, status, expires_at | DRM audit |
