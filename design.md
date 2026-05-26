---
name: Sprint Hub
colors:
  surface: '#FFFFFF'
  surface-dim: '#d7dbd9'
  surface-bright: '#f7faf8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f4f3'
  surface-container: '#ebefed'
  surface-container-high: '#e5e9e7'
  surface-container-highest: '#e0e3e1'
  on-surface: '#181c1c'
  on-surface-variant: '#3e4947'
  inverse-surface: '#2d3130'
  inverse-on-surface: '#eef1f0'
  outline: '#6e7977'
  outline-variant: '#bdc9c6'
  surface-tint: '#006a63'
  primary: '#005c55'
  on-primary: '#ffffff'
  primary-container: '#0f766e'
  on-primary-container: '#a3faef'
  inverse-primary: '#80d5cb'
  secondary: '#855300'
  on-secondary: '#ffffff'
  secondary-container: '#fea619'
  on-secondary-container: '#684000'
  tertiary: '#7f4025'
  on-tertiary: '#ffffff'
  tertiary-container: '#9c573a'
  on-tertiary-container: '#ffe5db'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#9cf2e8'
  primary-fixed-dim: '#80d5cb'
  on-primary-fixed: '#00201d'
  on-primary-fixed-variant: '#00504a'
  secondary-fixed: '#ffddb8'
  secondary-fixed-dim: '#ffb95f'
  on-secondary-fixed: '#2a1700'
  on-secondary-fixed-variant: '#653e00'
  tertiary-fixed: '#ffdbce'
  tertiary-fixed-dim: '#ffb598'
  on-tertiary-fixed: '#370e00'
  on-tertiary-fixed-variant: '#72361b'
  background: '#F7F8FA'
  on-background: '#181c1c'
  surface-variant: '#e0e3e1'
  surface-muted: '#F1F5F4'
  border: '#E2E8E6'
  text-primary: '#17211F'
  text-muted: '#66736F'
  primary-soft: '#CCFBF1'
  danger: '#DC2626'
  success: '#16A34A'
  info: '#2563EB'
typography:
  headline-lg:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 28px
  section-title:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-default:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  card-title:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  meta-xs:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  sidebar-width: 256px
  topbar-height: 64px
  container-padding: 24px
  gutter-md: 16px
  stack-sm: 8px
  stack-xs: 4px
---

# sprint-hub Frontend Design Specification

## 1. Mục tiêu giao diện
Thiết kế frontend cho `sprint-hub`: ứng dụng quản lý workspace, project và task theo Kanban workflow. Giao diện cần mềm mại, hiện đại, dễ scan, tập trung vào thao tác hằng ngày của team thay vì cảm giác landing page.

Frontend nên được gen theo hướng app dashboard thực tế:
- Dùng Tailwind CSS.
- Bo góc mềm, spacing thoáng, màu sắc tinh tế.
- Ưu tiên trải nghiệm quản lý công việc nhanh: tìm kiếm, lọc, drag/drop task, xem chi tiết task, comment, activity log.
- Không làm hero marketing hoặc landing page. Màn hình đầu tiên sau đăng nhập là dashboard/workspace app shell.
- Responsive tốt cho desktop, tablet, mobile.

## 2. Design Language

### Tailwind Theme Gợi Ý
```ts
colors: {
  background: "#F7F8FA",
  surface: "#FFFFFF",
  surfaceMuted: "#F1F5F4",
  border: "#E2E8E6",
  text: "#17211F",
  textMuted: "#66736F",
  primary: "#0F766E",
  primaryHover: "#115E59",
  primarySoft: "#CCFBF1",
  accent: "#F59E0B",
  danger: "#DC2626",
  success: "#16A34A",
  info: "#2563EB"
}
```

### Visual Tokens
- Page background: `bg-[#F7F8FA]`
- Main surface: `bg-white`
- Muted surface: `bg-[#F1F5F4]`
- Border: `border-[#E2E8E6]`
- Text primary: `text-[#17211F]`
- Text secondary: `text-[#66736F]`
- Primary action: teal `#0F766E`
- Border radius:
  - Buttons/input: `rounded-lg`
  - Cards/panels: `rounded-xl`
  - Modals/drawers: `rounded-2xl`
- Shadow:
  - Default panel: `shadow-sm`
  - Floating menu/modal: `shadow-xl shadow-slate-200/60`

### Typography
- Font: Inter, Geist, hoặc system sans-serif.
- Heading app:
  - Page title: `text-2xl font-semibold`
  - Section title: `text-base font-semibold`
  - Card title: `text-sm font-medium`
- Body:
  - Default: `text-sm`
  - Meta/helper: `text-xs text-muted`

## 3. App Shell
App sau đăng nhập dùng layout 3 vùng:
- Left sidebar cố định (w-64): workspace switcher, navigation. Active item dùng teal soft background.
- Top bar (h-16): search, create button, notification, user menu.
- Main content: dashboard/project/board/settings.

## 4. Core Screens to Generate
1. **Login**: Centered auth panel, max width 420px.
2. **Dashboard**: Metric rows (Projects, Tasks, My Tasks, Upcoming), tasks by status chart, recent activity.
3. **Project List**: Header with search/filter, table/grid of projects with status badges and task counts.
4. **Kanban Board**: Columns (TODO, IN_PROGRESS, IN_REVIEW, DONE, CANCELED). Task cards with priority, assignee, due date.
5. **Task Detail Drawer**: Right-side drawer with title, status/priority selects, description, comments, and activity log.
