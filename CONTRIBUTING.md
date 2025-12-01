# 📋 Contributing Guidelines

## Development Workflow

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow TypeScript strict mode
   - Use Tailwind CSS for styling
   - Add appropriate ARIA labels
   - Keep components small and focused

4. **Test your changes**
   ```bash
   npm run dev
   npm run storybook
   ```

5. **Build to verify**
   ```bash
   npm run build
   npm run build-storybook
   ```

6. **Commit with meaningful messages**
   ```bash
   git commit -m "feat: Add dark mode support"
   git commit -m "fix: Correct event overlap calculation"
   git commit -m "docs: Update README with new features"
   ```

7. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

## Code Style

- Use functional components with hooks
- Prefer `const` over `let`
- Use TypeScript strict mode
- Add JSDoc comments for complex functions
- Keep functions under 50 lines when possible
- Use meaningful variable names

## Component Guidelines

- Wrap components in `React.memo` for performance
- Use `useCallback` for event handlers
- Use `useMemo` for expensive calculations
- Add proper TypeScript types
- Include ARIA attributes

## Commit Message Format

```
type(scope): Subject

Body (optional)

Footer (optional)
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance

## Pull Request Process

1. Update README if needed
2. Add Storybook stories for new components
3. Ensure build passes
4. Get approval from maintainer
5. Squash commits if requested

## Questions?

Open an issue or discussion on GitHub.
