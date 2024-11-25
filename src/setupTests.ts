import { expect } from 'vitest'
import * as matchers from '@testing-library/jest-dom/matchers'
import { cleanup } from '@testing-library/react'

beforeAll(() => {
  expect.extend(matchers)
})

afterEach(() => {
  cleanup()
})