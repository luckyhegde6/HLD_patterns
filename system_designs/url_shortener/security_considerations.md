# Security Considerations

---

## Threats

- Malicious URLs
- Phishing
- URL enumeration
- Abuse and spam

---

## Mitigations

### URL Validation
- Block known malicious domains
- Integrate threat intelligence feeds

### Rate Limiting
- Limit URL creation per IP/user

### Access Control
- Optional auth for URL creation
- Public redirects allowed

---

## HTTPS Enforcement

- Enforce HTTPS for all redirects
- Prevent downgrade attacks
