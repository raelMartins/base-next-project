import * as react_jsx_runtime from 'react/jsx-runtime';
import React from 'react';

declare const LibraryProvider: ({ children }: {
    children: React.ReactNode;
}) => react_jsx_runtime.JSX.Element;

interface ListingsPageProps {
    apiKey: string;
    userName?: string;
}
declare const ListingsPage: ({ apiKey, userName }: ListingsPageProps) => react_jsx_runtime.JSX.Element;

interface ReferralsPageProps {
    apiKey: string;
    userName?: string;
}
declare const ReferralsPage: ({ apiKey, userName }: ReferralsPageProps) => react_jsx_runtime.JSX.Element;

interface RequestPageProps {
    apiKey: string;
    userName?: string;
}
declare const RequestPage: ({ apiKey, userName }: RequestPageProps) => react_jsx_runtime.JSX.Element;

interface TransactionPageProps {
    apiKey: string;
    userName?: string;
}
declare const TransactionsPage: ({ apiKey, userName }: TransactionPageProps) => react_jsx_runtime.JSX.Element;

interface ProfilePageProps {
    apiKey: string;
    userName?: string;
}
declare const ProfilePage: ({ apiKey, userName }: ProfilePageProps) => react_jsx_runtime.JSX.Element;

declare const BaseLogin: () => react_jsx_runtime.JSX.Element;

declare const AuthVerificationPage: () => react_jsx_runtime.JSX.Element;

export { AuthVerificationPage, BaseLogin, LibraryProvider, ListingsPage, type ListingsPageProps, ProfilePage, type ProfilePageProps, ReferralsPage, type ReferralsPageProps, RequestPage, type RequestPageProps, type TransactionPageProps, TransactionsPage };
