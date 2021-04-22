import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  getAllFridges: Array<Fridge>;
  getMyFridges: Array<Fridge>;
  getFridge: Fridge;
  hello?: Maybe<Scalars['String']>;
  me?: Maybe<User>;
};


export type QueryGetFridgeArgs = {
  id: Scalars['String'];
};

export type Fridge = {
  __typename?: 'Fridge';
  _id?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  address: Scalars['String'];
  description: Scalars['String'];
  imageUrl: Scalars['String'];
  instagram: Scalars['String'];
  twitter: Scalars['String'];
  author: User;
  lat?: Maybe<Scalars['Float']>;
  lng?: Maybe<Scalars['Float']>;
};

export type User = {
  __typename?: 'User';
  _id?: Maybe<Scalars['ID']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createFridge: Fridge;
  updateFridge: Fridge;
  deleteFridge: Scalars['Boolean'];
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  updateUser: UserResponse;
  deleteUser: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  changePassword: UserResponse;
};


export type MutationCreateFridgeArgs = {
  inputs: FridgeInput;
};


export type MutationUpdateFridgeArgs = {
  inputs: UpdateFridgeInput;
};


export type MutationDeleteFridgeArgs = {
  id: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: RegisterInput;
};


export type MutationLoginArgs = {
  options: LoginInput;
};


export type MutationUpdateUserArgs = {
  options: UpdateInput;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};

export type FridgeInput = {
  name: Scalars['String'];
  address: Scalars['String'];
  description: Scalars['String'];
  imageUrl: Scalars['String'];
  instagram: Scalars['String'];
  twitter: Scalars['String'];
};

export type UpdateFridgeInput = {
  name: Scalars['String'];
  address: Scalars['String'];
  description: Scalars['String'];
  imageUrl: Scalars['String'];
  instagram: Scalars['String'];
  twitter: Scalars['String'];
  id: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type RegisterInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UpdateInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type ErrorFragmentFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type UserFragmentFragment = (
  { __typename?: 'User' }
  & Pick<User, 'firstName' | 'lastName' | 'email' | '_id'>
);

export type UserResponseFragmentFragment = (
  { __typename?: 'UserResponse' }
  & { errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & ErrorFragmentFragment
  )>>, user?: Maybe<(
    { __typename?: 'User' }
    & UserFragmentFragment
  )> }
);

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: (
    { __typename?: 'UserResponse' }
    & UserResponseFragmentFragment
  ) }
);

export type CreateFridgeMutationVariables = Exact<{
  inputs: FridgeInput;
}>;


export type CreateFridgeMutation = (
  { __typename?: 'Mutation' }
  & { createFridge: (
    { __typename?: 'Fridge' }
    & Pick<Fridge, '_id' | 'name' | 'address' | 'description' | 'lat' | 'lng'>
    & { author: (
      { __typename?: 'User' }
      & Pick<User, 'firstName' | 'lastName' | 'email' | '_id'>
    ) }
  ) }
);

export type DeleteFridgeMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteFridgeMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteFridge'>
);

export type DeleteUserMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteUser'>
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & UserResponseFragmentFragment
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & UserResponseFragmentFragment
  ) }
);

export type UpdateFridgeMutationVariables = Exact<{
  inputs: UpdateFridgeInput;
}>;


export type UpdateFridgeMutation = (
  { __typename?: 'Mutation' }
  & { updateFridge: (
    { __typename?: 'Fridge' }
    & Pick<Fridge, '_id' | 'name'>
  ) }
);

export type UpdateUserMutationVariables = Exact<{
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & { updateUser: (
    { __typename?: 'UserResponse' }
    & UserResponseFragmentFragment
  ) }
);

export type GetAllFridgesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllFridgesQuery = (
  { __typename?: 'Query' }
  & { getAllFridges: Array<(
    { __typename?: 'Fridge' }
    & Pick<Fridge, '_id' | 'name' | 'address' | 'description' | 'instagram' | 'twitter' | 'imageUrl' | 'lat' | 'lng'>
  )> }
);

export type GetFridgeQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetFridgeQuery = (
  { __typename?: 'Query' }
  & { getFridge: (
    { __typename?: 'Fridge' }
    & Pick<Fridge, '_id' | 'name' | 'address' | 'description' | 'instagram' | 'twitter' | 'imageUrl'>
  ) }
);

export type GetMyFridgesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyFridgesQuery = (
  { __typename?: 'Query' }
  & { getMyFridges: Array<(
    { __typename?: 'Fridge' }
    & Pick<Fridge, '_id' | 'name' | 'imageUrl'>
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, '_id' | 'firstName' | 'lastName' | 'email'>
  )> }
);

export const ErrorFragmentFragmentDoc = gql`
    fragment ErrorFragment on FieldError {
  field
  message
}
    `;
export const UserFragmentFragmentDoc = gql`
    fragment UserFragment on User {
  firstName
  lastName
  email
  _id
}
    `;
export const UserResponseFragmentFragmentDoc = gql`
    fragment UserResponseFragment on UserResponse {
  errors {
    ...ErrorFragment
  }
  user {
    ...UserFragment
  }
}
    ${ErrorFragmentFragmentDoc}
${UserFragmentFragmentDoc}`;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $newPassword: String!) {
  changePassword(token: $token, newPassword: $newPassword) {
    ...UserResponseFragment
  }
}
    ${UserResponseFragmentFragmentDoc}`;

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
};
export const CreateFridgeDocument = gql`
    mutation CreateFridge($inputs: FridgeInput!) {
  createFridge(inputs: $inputs) {
    _id
    name
    address
    description
    author {
      firstName
      lastName
      email
      _id
    }
    lat
    lng
  }
}
    `;

export function useCreateFridgeMutation() {
  return Urql.useMutation<CreateFridgeMutation, CreateFridgeMutationVariables>(CreateFridgeDocument);
};
export const DeleteFridgeDocument = gql`
    mutation DeleteFridge($id: String!) {
  deleteFridge(id: $id)
}
    `;

export function useDeleteFridgeMutation() {
  return Urql.useMutation<DeleteFridgeMutation, DeleteFridgeMutationVariables>(DeleteFridgeDocument);
};
export const DeleteUserDocument = gql`
    mutation DeleteUser {
  deleteUser
}
    `;

export function useDeleteUserMutation() {
  return Urql.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument);
};
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
};
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(options: {email: $email, password: $password}) {
    ...UserResponseFragment
  }
}
    ${UserResponseFragmentFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
  register(
    options: {firstName: $firstName, lastName: $lastName, email: $email, password: $password}
  ) {
    ...UserResponseFragment
  }
}
    ${UserResponseFragmentFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const UpdateFridgeDocument = gql`
    mutation UpdateFridge($inputs: UpdateFridgeInput!) {
  updateFridge(inputs: $inputs) {
    _id
    name
  }
}
    `;

export function useUpdateFridgeMutation() {
  return Urql.useMutation<UpdateFridgeMutation, UpdateFridgeMutationVariables>(UpdateFridgeDocument);
};
export const UpdateUserDocument = gql`
    mutation UpdateUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
  updateUser(
    options: {firstName: $firstName, lastName: $lastName, email: $email, password: $password}
  ) {
    ...UserResponseFragment
  }
}
    ${UserResponseFragmentFragmentDoc}`;

export function useUpdateUserMutation() {
  return Urql.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument);
};
export const GetAllFridgesDocument = gql`
    query GetAllFridges {
  getAllFridges {
    _id
    name
    address
    description
    instagram
    twitter
    imageUrl
    lat
    lng
  }
}
    `;

export function useGetAllFridgesQuery(options: Omit<Urql.UseQueryArgs<GetAllFridgesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetAllFridgesQuery>({ query: GetAllFridgesDocument, ...options });
};
export const GetFridgeDocument = gql`
    query GetFridge($id: String!) {
  getFridge(id: $id) {
    _id
    name
    address
    description
    instagram
    twitter
    imageUrl
  }
}
    `;

export function useGetFridgeQuery(options: Omit<Urql.UseQueryArgs<GetFridgeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetFridgeQuery>({ query: GetFridgeDocument, ...options });
};
export const GetMyFridgesDocument = gql`
    query GetMyFridges {
  getMyFridges {
    _id
    name
    imageUrl
  }
}
    `;

export function useGetMyFridgesQuery(options: Omit<Urql.UseQueryArgs<GetMyFridgesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetMyFridgesQuery>({ query: GetMyFridgesDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    _id
    firstName
    lastName
    email
  }
}
    `;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};