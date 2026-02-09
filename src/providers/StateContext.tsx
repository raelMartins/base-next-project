import { createContext, Suspense } from 'react';

export interface StateContextProviderProps {
  children: React.ReactNode;
  accessToken?: string;
  themeConfig?: Record<string, unknown>;
}

export const StateContext = createContext<Partial<StateContextProviderProps>>(
  {}
);

export const StateContextProvider = ({
  children,
  ...props
}: StateContextProviderProps) => {
  return (
    <StateContext.Provider value={{ ...props }}>
      <Suspense fallback={<div>Loading</div>}>{children}</Suspense>
    </StateContext.Provider>
  );
};
