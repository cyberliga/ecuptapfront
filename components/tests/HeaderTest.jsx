import * as React from 'react'
import { render, screen, fireEvent } from '@testing-library/react-native'
import Header from '@components/Header'

test('Test get username', async () => {
  const expectedUsername = 'localuser'

  render(<Header />)

  const usernameOutput = await screen.findByTestId('localuser')
  expect(usernameOutput).toHaveTextContent(expectedUsername)

  expect(screen.toJSON()).toMatchSnapshot()
})