import * as react_jsx_runtime from 'react/jsx-runtime';

interface RealtorsPortalProviderProps {
    children: React.ReactNode;
    baseRoute: string;
    accessToken: string;
    themeConfig?: Record<string, any>;
}
declare const RealtorsPortalProvider: ({ children, themeConfig, ...rest }: RealtorsPortalProviderProps) => react_jsx_runtime.JSX.Element;

interface ListingsPageProps {
    apiKey: string;
    userName?: string;
}
declare const ListingsPage: ({ apiKey, userName }: ListingsPageProps) => react_jsx_runtime.JSX.Element;

declare const ReferralsPage: ({ id }: {
    id: string;
}) => react_jsx_runtime.JSX.Element;

declare const ReferralTransactionSummary: ({ user_id, id }: {
    id: string;
    user_id: string;
}) => react_jsx_runtime.JSX.Element;

declare const RequestPage: () => react_jsx_runtime.JSX.Element;

declare const TransactionsPage: () => react_jsx_runtime.JSX.Element;

declare const ProfilePage: () => react_jsx_runtime.JSX.Element;

declare const BaseLogin: () => react_jsx_runtime.JSX.Element;

declare const AuthVerificationPage: () => react_jsx_runtime.JSX.Element;

export { AuthVerificationPage, BaseLogin, ListingsPage, ProfilePage, RealtorsPortalProvider, ReferralTransactionSummary, ReferralsPage, RequestPage, TransactionsPage };
