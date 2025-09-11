# Architecture Documentation

## Project Structure

### Layout System

- **Layout.astro**: Main layout wrapper with header, main, and conditional footer
- **PageContainer.astro**: Standard content container with unified spacing
- **HomeContainer.astro**: Special full-screen container for home page

### Page Types

- **Home**: Full-screen hero section with centered content
- **Content Pages**: Standard pages with consistent spacing and max-widths

### Container Types

- **narrow** (`max-w-4xl`): About, Work - Text-heavy content
- **medium** (`max-w-5xl`): Home - Balanced content
- **wide** (`max-w-6xl`): Projects - Grid layouts

### Spacing System

- **Horizontal**: `px-4 sm:px-6 lg:px-8` - Responsive horizontal padding
- **Vertical**: `py-8 sm:py-12 lg:py-16` - Responsive vertical padding
- **Container**: `max-w-7xl` - Maximum container width

## Constants

### Layout Constants

Located in `src/utils/constants.ts`:

- `LAYOUT_CONSTANTS.CONTAINER_MAX_WIDTH`: Main container width
- `LAYOUT_CONSTANTS.CONTENT_MAX_WIDTH`: Content-specific widths
- `LAYOUT_CONSTANTS.PADDING`: Unified spacing system

## Benefits

1. **Consistency**: All pages use the same spacing system
2. **Maintainability**: Changes to spacing affect all pages
3. **Responsiveness**: Unified responsive breakpoints
4. **Type Safety**: TypeScript interfaces for all components
5. **Reusability**: Components can be easily reused across pages

## Usage

### Standard Content Page

```astro
<PageContainer type="narrow">
  <Section id="page" title="Page Title">
    <!-- Content -->
  </Section>
</PageContainer>
```

### Home Page

```astro
<HomeContainer>
  <Section id="home">
    <!-- Hero content -->
  </Section>
</HomeContainer>
```

### Projects Page

```astro
<PageContainer type="wide">
  <Section id="projects" title="Projects">
    <!-- Grid content -->
  </Section>
</PageContainer>
```
