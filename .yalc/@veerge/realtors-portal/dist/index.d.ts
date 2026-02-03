import * as react_jsx_runtime from 'react/jsx-runtime';

interface RealtorsPortalProviderProps {
    children: React.ReactNode;
    baseRoute: string;
    accessToken: string;
}
declare const RealtorsPortalProvider: ({ children, ...rest }: RealtorsPortalProviderProps) => react_jsx_runtime.JSX.Element;

declare const ListingsPage: () => react_jsx_runtime.JSX.Element;

declare const ReferralsPage: () => react_jsx_runtime.JSX.Element;

declare const RequestPage: () => react_jsx_runtime.JSX.Element;

declare const TransactionsPage: () => react_jsx_runtime.JSX.Element;

declare const ProfilePage: () => react_jsx_runtime.JSX.Element;

declare const BaseLogin: () => react_jsx_runtime.JSX.Element;

declare const AuthVerificationPage: () => react_jsx_runtime.JSX.Element;

export { AuthVerificationPage, BaseLogin, ListingsPage, ProfilePage, RealtorsPortalProvider, ReferralsPage, RequestPage, TransactionsPage };
