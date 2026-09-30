import { createFileRoute, Outlet } from '@tanstack/react-router';
export const Route = createFileRoute('/our-works')({ component: () => <Outlet /> });
