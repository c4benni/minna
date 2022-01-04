<script>
export default {
  name: 'TextDivide',
  functional: true,
  render(h, c) {
    const scoping = { 'data-tde': '' }
    const span = (d, c) => h('span', d, c)

    return span(
      {
        attrs: { ...scoping, role: 'presentation' },
        staticClass: 'root',
      },
      [
        span(
          {
            attrs: { ...scoping },
            staticClass: 'content',
          },
          [c.children]
        ),
      ]
    )
  },
}
</script>

<style>
.root[data-tde] {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  column-gap: 1rem;
  align-items: center;
  font-size: 1rem;
}

.content[data-tde] {
  letter-spacing: 0.5px;
  opacity: var(--t-subtitle);
}

.root[data-tde]::before,
.root[data-tde]::after {
  width: 100%;
  height: 1px;
  background-color: var(--divide-color);
  content: '';
}
</style>
