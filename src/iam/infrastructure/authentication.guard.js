import useIamStore from "../application/iam.store.js";

/**
 * Navigation guard that protects non-public routes for anonymous users.
 *
 * @param {import('vue-router').RouteLocationNormalized} to - Target route.
 * @param {import('vue-router').RouteLocationNormalized} from - Current route.
 * @returns {boolean | { name: string} } - Route name in case guard condition unsatisfied, true otherwise.
 */
export const authenticationGuard = (to, from) => {
    const store = useIamStore();
    const isAnonymous = !store.isSignedIn;
    const publicRoutes = ['/iam/sign-in', '/iam/sign-up', '/about', '/page-not-found'];
    const routeRequiresToBeAuthenticated = !publicRoutes.includes(to.path);
    if (isAnonymous && routeRequiresToBeAuthenticated) return { name: 'iam-sign-in'};
    console.log(`Navigating from ${from.name} to ${to.name}`);
}