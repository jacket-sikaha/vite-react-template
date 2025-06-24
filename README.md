# Vite React TypeScript 脚手架模板

一个功能完善、可快速上手的现代化React前端脚手架模板，基于Vite构建，集成TypeScript、状态管理、路由系统和API请求等核心功能。

## ✨ 特性

- ⚡️ **快速开发** - 基于Vite实现秒级热更新
- 🔒 **类型安全** - 全面使用TypeScript确保代码质量
- 📦 **状态管理** - 集成Zustand实现轻量级全局状态管理
- 🚦 **路由系统** - 基于React Router实现路由管理与权限控制
- 🔄 **API请求** - 封装Axios请求客户端，统一处理认证与错误
- 🎨 **主题支持** - 内置明暗主题切换功能，支持本地存储
- 📱 **响应式设计** - 适配各种屏幕尺寸的现代化UI
- 🚀 **性能优化** - 集成多种Vite插件优化构建产物
- ✅ **代码规范** - 内置ESLint和Prettier确保代码风格一致

## 🛠️ 技术栈

- **前端框架**: React 18+
- **路由管理**: React Router 6+
- **类型系统**: TypeScript 5.0+
- **UI 组件库**: Material UI (MUI)
- **状态管理**: Zustand
- **HTTP 客户端**: Axios
- **构建工具**: Vite 4+
- **代码规范**: ESLint + Prettier

## 🚀 快速开始

### 环境要求
- Node.js 14.0.0+ 
- npm 6.0.0+ 或 yarn 1.22.0+

## 📁 文件结构规范

```
/src
  /assets        # 静态资源
  /components    # 共享组件
  /hooks         # 自定义Hooks
  /pages         # 页面组件
  /routes        # 路由配置
  /store         # 状态管理
  /types         # 类型定义
  /utils         # 工具函数
  App.tsx        # 应用入口
  main.tsx       # 渲染入口
```

## ⚙️ 配置说明

### 环境变量
创建`.env`文件配置环境变量：
```
VITE_API_BASE_URL=https://api.example.com
VITE_APP_TITLE=My App
```

### 路由配置
编辑`src/routes/index.tsx`添加或修改路由：
```typescript
{
  path: '/new-page',
  element: <NewPage />
}
```

## 🔧 功能扩展

### 添加新页面
1. 在`src/pages`目录下创建新页面组件
2. 在路由配置中添加路由条目
3. (可选)在布局组件中添加导航链接

### 添加状态管理
创建新的Zustand store：
```typescript
// src/store/counterStore.ts
import { create } from 'zustand';

export const useCounterStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 }))
}));
```


## 📄 许可证
MIT

## 🙏 致谢
- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Zustand](https://github.com/pmndrs/zustand)

