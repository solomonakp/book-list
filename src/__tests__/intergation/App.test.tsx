import React from 'react';

import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import userEvent from '@testing-library/user-event';
// utils
import { BuildBook, BuildAuthor } from 'utils/testHelpers';

// components
import App from 'App';

// queries
import {
  GET_BOOKS,
  GET_BOOK,
  GET_AUTHORS,
  ADD_AUTHOR,
  ADD_BOOK,
} from 'apollo/queries';
import { argumentsObjectFromField } from '@apollo/client/utilities';

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

describe('bookstore', () => {
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
    const [author1, author2] = [BuildAuthor(), BuildAuthor()];

    const [book1] = [
      BuildBook({
        overrides: {
          author: {
            name: author1.name,
          },
          authorId: author1.id,
        },
      }),
    ];

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
          query: GET_BOOKS,
        },
        result: {
          data: {
            books: [],
          },
        },
      },
      {
        request: {
          query: ADD_BOOK,
          variables: {
            genre: book1.genre,
            title: book1.title,
            authorId: author1.id,
          },
        },
        result: {
          data: {
            addBook: { title: book1.title, genre: book1.genre },
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
                authorId: book1.authorId,
                genre: book1.genre,
                id: book1.id,
                title: book1.title,
              },
            ],
          },
        },
      },
    ];

    setUpApp(mocks);

    const titleInput = (await screen.findByLabelText(
      /title/i
    )) as HTMLInputElement;
    const genreInput = (await screen.findByLabelText(
      /genre/i
    )) as HTMLInputElement;
    const option = (await screen.findByText(author1.name)) as HTMLOptionElement;
    const addBtn = await screen.findByRole('button');
    const select = (await screen.findByRole('combobox')) as HTMLSelectElement;

    expect(addBtn).toBeDisabled();

    userEvent.type(titleInput, book1.title);
    userEvent.type(genreInput, book1.genre);
    userEvent.selectOptions(select, option);

    await waitFor(() => {
      expect(option.selected).toBe(true);
    });

    expect(addBtn).toBeEnabled();

    userEvent.click(addBtn);

    await waitFor(() => {
      expect(
        screen.getByText(/Book has been successfully added/i)
      ).toBeInTheDocument();
    });
  });

  it('should be able to add author', async () => {
    const [author1, author2, author3] = [
      BuildAuthor(),
      BuildAuthor(),
      BuildAuthor(),
    ];

    const getAuthorRes = [
      { id: author1.id, name: author1.name },
      { id: author2.id, name: author2.name },
    ];

    const variables = {
      age: author3.age,
      name: author3.name,
    };

    const mocks = [
      {
        request: {
          query: GET_AUTHORS,
        },
        result: {
          data: {
            authors: getAuthorRes,
          },
        },
      },
      {
        request: {
          query: ADD_AUTHOR,
          variables,
        },
        result: {
          data: {
            addAuthor: variables,
          },
        },
      },
      {
        request: {
          query: GET_AUTHORS,
        },
        result: {
          data: {
            authors: [...getAuthorRes, variables],
          },
        },
      },
    ];

    setUpApp(mocks);

    const toggleBtn = await screen.findByText(/add author/i);

    fireEvent.click(toggleBtn);

    const nameInput = (await screen.findByLabelText(
      /name/i
    )) as HTMLInputElement;
    const ageInput = (await screen.findByLabelText(/age/i)) as HTMLInputElement;

    const addBtn = await screen.findByRole('button');

    expect(addBtn).toBeDisabled();

    userEvent.type(nameInput, variables.name);
    userEvent.type(ageInput, variables.age.toString());

    await waitFor(() => {
      expect(addBtn).toBeEnabled();
    });

    userEvent.click(addBtn);

    await waitFor(() => {
      expect(
        screen.getByText(/author has been successfully added/i)
      ).toBeInTheDocument();
    });
  });

  it('can fetch book details', async () => {
    const [author1] = [BuildAuthor()];

    const book = BuildBook({
      overrides: {
        author: {
          name: author1.name,
          age: author1.age,
          books: [],
        },
        authorId: author1.id,
      },
    });

    const mocks = [
      {
        request: {
          query: GET_BOOKS,
        },
        result: {
          data: {
            books: [book],
          },
        },
      },
      {
        request: {
          query: GET_AUTHORS,
        },
        result: {
          data: {
            authors: [author1],
          },
        },
      },
      {
        request: {
          query: GET_BOOK,
          variables: {
            bookId: book.id,
          },
        },
        result: {
          data: {
            book: book,
          },
        },
      },
    ];
    setUpApp(mocks);

    fireEvent.click(await screen.findByText(book.title));

    await waitFor(() => {
      expect(screen.getByText(`Genre: ${book.genre}`)).toBeInTheDocument();
    });
  });

  it('should be able to display errors', async () => {
    const mocks = [
      {
        request: {
          query: GET_BOOKS,
        },
        error: new Error('error occurred fetching authors'),
      },
    ];
    setUpApp(mocks);

    await waitFor(() => {
      expect(
        screen.getByText(/error occurred fetching authors/i)
      ).toBeInTheDocument();
    });
  });
});
