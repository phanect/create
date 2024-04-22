---
name: "project"
root: "."
output: "**/*"
ignore: []
questions:
  name: "What is the name of the new project?"
  owner:
    message: "Is this a personal or company project?",
    choices:
      - "personal"
      - "company"
  license:
    message: "Choose opensource license",
    choices:
      - "Apache-2.0"
      - "CC0-1.0"
      - "MIT"
      - "UNLICENSED"
  type:
    message: "Is this project a library or an app?",
    choices:
      - "app"
      - "lib"
  lang:
    message: "Choose language",
    choices:
      - "typescript"
      - "javascript"
  runtime:
    message: "Which runtime environment do you use?",
    choices:
      - "browser"
      - "node"
    initial: true,
  ci:
    message: "Which CI do you use?",
    choices:
      - "circleci"
      - "github-actions"
---

# `{{ inputs.ci !== "circleci" && "!" }}.circleci/config.yml`

```yaml
```

# `{{ inputs.ci !== "github-actions" && "!" }}.github/workflows/actions.yml`

```yaml
```

# `{{ inputs.lang !== "typescript" && "!" }}tsconfig.json`

```json
```

# `{{ inputs.runtime !== "browser" && "!" }}webpack.config.js`

```javascript
```

# `{{ inputs.lang !== "javascript" && "!" }}test/main.test.js`

```javascript
```

# `{{ inputs.lang !== "javascript" && "!" }}test/testutils.js`

```javascript
```

# `{{ inputs.lang !== "typescript" && "!" }}test/main.test.ts`

```typescript
```

# `{{ inputs.lang !== "typescript" && "!" }}test/testutils.ts`

```typescript
```

# `{{ inputs.lang !== "typescript" && "!" }}test/tsconfig.json`

```json
```

# `{{ inputs.license === "UNLICENSED" && "!" }}LICENSE`

```text
{{ if inputs.license === "Apache-2.0" }}

{{ else if inputs.license === "MIT" }}

{{ else if inputs.license === "CC0-1.0" }}

{{ end }}
```
