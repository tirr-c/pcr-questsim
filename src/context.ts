import React from 'react';

import { Client } from './graphql';

export const GqlContext = React.createContext<{ client?: Client }>({ client: undefined });
