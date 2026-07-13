# Contributing to Next.js Template by SnowDev

First off, thank you for considering contributing to this project! It's people like you that make this template better for everyone.

## 🎯 Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## 🤝 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* **Use a clear and descriptive title**
* **Describe the exact steps to reproduce the problem**
* **Provide specific examples to demonstrate the steps**
* **Describe the behavior you observed after following the steps**
* **Explain which behavior you expected to see instead and why**
* **Include screenshots and animated GIFs if possible**

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* **Use a clear and descriptive title**
* **Provide a step-by-step description of the suggested enhancement**
* **Provide specific examples to demonstrate the steps**
* **Describe the current behavior and explain the behavior you expected**
* **Explain why this enhancement would be useful**

### Pull Requests

* Fill in the required template
* Do not include issue numbers in the PR title
* Follow the TypeScript and React style guides
* Include thoughtfully-worded, well-structured tests
* Document new code
* End all files with a newline

## 🚀 Development Process

1. **Fork the repo** and create your branch from `main`
2. **Make your changes**
3. **If you've added code**, add tests
4. **Ensure the test suite passes**: `npm test`
5. **Make sure your code lints**: `npm run lint`
6. **Run Prisma validation**: `npx prisma validate`
7. **Test with Docker** if you've changed Docker configuration
8. **Issue that pull request!**

## 📝 Style Guide

### Git Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line

### TypeScript Style Guide

* Use 2 spaces for indentation
* Prefer `const` over `let`
* Use meaningful variable names
* Add types to all function parameters and return values
* Use interfaces for object types
* Use enums for fixed sets of values

### React Style Guide

* Use functional components with hooks
* One component per file
* Use PascalCase for component names
* Use camelCase for props and variables
* Extract reusable logic into custom hooks
* Use TypeScript for all components

### Prisma Style Guide

* Use camelCase for field names
* Use PascalCase for model names
* Add `@@map` for custom table names
* Include `createdAt` and `updatedAt` fields
* Use appropriate field types
* Add indexes for frequently queried fields

## 🗂️ Project Structure

```
├── app/                 # Next.js App Router
│   ├── api/            # API routes
│   └── ...             # Pages
├── components/         # React components
│   └── ui/            # UI components
├── lib/               # Utility functions
├── prisma/            # Prisma schema and migrations
├── stores/            # Zustand stores
└── styles/            # Global styles
```

## 🧪 Testing

* Write tests for all new features
* Ensure all tests pass before submitting PR
* Aim for >80% code coverage
* Test both happy paths and edge cases

## 📚 Documentation

* Update README.md with any new features
* Add JSDoc comments to complex functions
* Update API documentation if endpoints change
* Add examples for new features

## 🐛 Debugging

* Use console.log sparingly
* Prefer debugging tools (VS Code debugger, React DevTools)
* Add meaningful error messages
* Use try-catch blocks for async operations

## 🔒 Security

* Never commit sensitive data (.env files)
* Use environment variables for secrets
* Validate all user inputs
* Follow security best practices
* Report security vulnerabilities privately

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 💬 Questions?

Feel free to contact the project maintainers if you have any questions or need help with the contribution process.

---

**Happy Contributing! 🎉**
