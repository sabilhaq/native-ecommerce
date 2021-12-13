import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import Config from 'react-native-config';

const client = new ApolloClient({
  uri: `${Config.REACT_APP_BASE_URL}graphql`,
});

export const loadProducts = queryStringObj => {
  let {page, title} = queryStringObj;
  page = page ? page : 1;
  title = title ? title : '';

  const GET_PRODUCTS = gql`
    query getProducts($title: String, $page: Int) {
      getProducts(title: $title, page: $page) {
        id
        title
        rate
        description
        price
        photos
        createdAt
        updatedAt
      }
    }
  `;
  return client
    .query({query: GET_PRODUCTS, variables: {page, title}})
    .then(response => {
      return response.data.getProducts;
    })
    .catch(err => {
      throw err;
    });
};

export const loadProduct = id => {
  const GET_PRODUCT = gql`
    query getProduct($id: String!) {
      getProduct(id: $id) {
        id
        title
        rate
        description
        price
        brand
        photos
        detail
        UserId
        createdAt
        updatedAt
      }
    }
  `;
  return client
    .query({
      query: GET_PRODUCT,
      variables: {id},
    })
    .then(response => response.data.getProduct)
    .catch(err => {
      throw err;
    });
};

export const addProduct = (id, input) => {
  const {
    title,
    rate,
    description,
    brand,
    detail,
    quantity,
    price,
    userId,
    photos,
  } = input;
  const ADD_PRODUCT = gql`
    mutation createProduct(
      $id: String!
      $title: String!
      $rate: Int!
      $description: String
      $brand: String
      $detail: String
      $votes: Int!
      $quantity: Int!
      $price: Int!
      $UserId: String!
      $photos: [String]
    ) {
      createProduct(
        input: {
          id: $id
          title: $title
          rate: $rate
          description: $description
          brand: $brand
          detail: $detail
          votes: $votes
          quantity: $quantity
          price: $price
          UserId: $UserId
          photos: $photos
        }
      ) {
        id
        title
        rate
        description
        price
        createdAt
        updatedAt
      }
    }
  `;
  client
    .mutate({
      mutation: ADD_PRODUCT,
      variables: {
        id,
        title,
        rate,
        description,
        brand,
        detail,
        votes: 0,
        quantity,
        price,
        UserId: userId,
        photos,
      },
    })
    .then(response => response.data.createProduct)
    .catch(err => {
      throw err;
    });
};

// Chats

export const loadChats = param => {
  const {sender, receiver} = param;
  const GET_CHATS = gql`
    query getChats($sender: String!, $receiver: String!) {
      getChats(sender: $sender, receiver: $receiver) {
        _id
        content
        status
        createdAt
        updatedAt
      }
    }
  `;
  return client
    .query({
      query: GET_CHATS,
      variables: {
        sender,
        receiver,
      },
    })
    .then(response => response.data.getChats)
    .catch(err => {
      throw err;
    });
};

export const addChat = input => {
  const {content, sender, receiver} = input;
  const ADD_CHAT = gql`
    mutation createChat(
      $content: String!
      $sender: String!
      $receiver: String!
    ) {
      createChat(
        input: {content: $content, sender: $sender, receiver: $receiver}
      ) {
        _id
        status
        content
        sent
        createdAt
        updatedAt
      }
    }
  `;
  client
    .mutate({
      mutation: ADD_CHAT,
      variables: {
        content,
        sender,
        receiver,
      },
    })
    .then(response => {
      return response.data.createChat;
    })
    .catch(err => {
      throw err;
    });
};
