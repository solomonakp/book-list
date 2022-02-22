import React from 'react';

import {
  render,
  fireEvent,
  waitFor,
  screen,
  findByLabelText,
} from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import userEvent from '@testing-library/user-event';
// utils
import { BuildBook, BuildAuthor } from 'utils/testHelpers';

// components
import App from 'App';

// queries
import { GET_BOOKS, GET_AUTHORS, ADD_AUTHOR } from 'apollo/queries';

beforeEach(() => {
  jest.useFakeTimers();
});
afterEach(() => {
  jest.resetAllMocks();
});

const setUpApp = (
  mock: readonly MockedResponse<Record<string, any>>[] | undefined
) =>
  render(
    <MockedProvider mocks={mock} addTypename={false}>
      <App />
    </MockedProvider>
  );

describe('bookstore integrations tests', () => {
  it('displays a loading state while fetching books.', async () => {
    setUpApp([]);

    const loader = screen.getByTestId(/loader/i);

    expect(loader).toBeInTheDocument();
  });

  it('shows a list of books.', async () => {
    const books = [BuildBook(), BuildBook(), BuildBook(), BuildBook()];
    const mocks = [
      {
        request: {
          query: GET_BOOKS,
        },
        result: {
          data: {
            books: books,
          },
        },
      },
    ];

    setUpApp(mocks);

    const loader = screen.getByTestId(/loader/i);

    expect(loader).toBeInTheDocument();

    const bookItems = await screen.findAllByTestId('book-item');

    expect(loader).not.toBeInTheDocument();

    expect(bookItems).toHaveLength(4);
  });

  it('should be able to toggle between add book and add author', async () => {
    setUpApp([]);

    const toggleBtn = await screen.findByText(/add author/i);

    expect(screen.getByText(/Add a Book/i)).toBeInTheDocument();

    fireEvent.click(toggleBtn);

    expect(screen.queryByText(/Add a Book/i)).not.toBeInTheDocument();

    expect(await screen.findByText(/Add a Author/i)).toBeInTheDocument();
  });

  it('should be able to add a book', async () => {
    const [book1] = [BuildBook()];

    const [author1, author2] = [BuildAuthor(), BuildAuthor()];

    const entry = {
      ...book1,
      authorId: author1.id,
      author: {
        name: author1.name,
      },
    };

    const mocks = [
      {
        request: {
          query: GET_AUTHORS,
        },
        result: {
          data: {
            authors: [
              { id: author1.id, name: author1.name },
              { id: author2.id, name: author2.name },
            ],
          },
        },
      },
      {
        request: {
          query: ADD_AUTHOR,
          // variables: {
          //   title: entry.title,
          //   authorId: author1.id,
          //   genre: entry.genre,
          // },
        },
        result: {
          data: {
            addBook: [{ title: entry.title, genre: entry.genre }],
          },
        },
      },
      {
        request: {
          query: GET_BOOKS,
        },
        result: {
          data: {
            books: [
              {
                authorId: entry.authorId,
                genre: entry.genre,
                id: entry.id,
                title: entry.title,
              },
            ],
          },
        },
      },
    ];

    setUpApp(mocks);

    const titleInput = await screen.findByLabelText(/title/i);
    const genreInput = await screen.findByLabelText(/genre/i);
    const option = (await screen.findByText(author1.name)) as HTMLOptionElement;
    const addBtn = await screen.findByRole('button');

    expect(addBtn).toBeDisabled();

    userEvent.type(titleInput, entry.title);
    userEvent.type(genreInput, entry.genre);
    userEvent.selectOptions(await screen.findByRole('combobox'), option);

    await waitFor(() => {
      expect(option.selected).toBe(true);
    });

    expect(addBtn).toBeEnabled();

    userEvent.click(addBtn);

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });

    // screen.debug(await screen.findByText();

    // expect().toBeInTheDocument();
  });

  it('should be able to add to  author', () => {});
  it('should be able to display errors', () => {});
});
