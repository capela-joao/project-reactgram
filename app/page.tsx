import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from '@/components/ui/navigation-menu';

export default function Home() {
  return (
    <div className="p-6 bg-gray-950 text-gray-50">
      <NavigationMenu>
        <NavigationMenuList>Login</NavigationMenuList>
        <NavigationMenuList>Register</NavigationMenuList>
        <NavigationMenuList>Teste3</NavigationMenuList>
        <NavigationMenuList>Teste4</NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
