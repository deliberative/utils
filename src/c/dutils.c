// Copyright (C) 2022 Deliberative Technologies P.C.
// SPDX-License-Identifier: AGPL-3.0
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>

#define NUMBER_LEN 4

__attribute__((used)) void
int_to_uint8(const int n, uint8_t array[NUMBER_LEN])
{
  array[0] = (n & 0xff000000) >> 24;
  array[1] = (n & 0x00ff0000) >> 16;
  array[2] = (n & 0x0000ff00) >> 8;
  array[3] = (n & 0x000000ff) >> 0;
}

__attribute__((used)) int
uint8_to_int(const uint8_t array[NUMBER_LEN])
{
  int n = 0;

  for (int i = 0; i < NUMBER_LEN; i++)
  {
    n = (n << 8) | array[i];
  }

  return n;
}

__attribute__((used)) bool
arrays_are_equal(const size_t ARRAY_LEN, const uint8_t array1[ARRAY_LEN],
                 const uint8_t array2[ARRAY_LEN])
{
  size_t i;

  for (i = 0; i < ARRAY_LEN; ++i)
  {
    if (array1[i] != array2[i]) return false;
  }

  return true;
}

__attribute__((used)) bool
array_is_number(const size_t ARRAY_LEN, const uint8_t array[ARRAY_LEN],
                const int number)
{
  size_t i;
  int counter = 0;

  if (number < 0 || number > 255) return false;

  for (i = 0; i < ARRAY_LEN; i++)
  {
    if (array[i] == number)
    {
      counter++;
    }
    else
    {
      return false;
    }
  }

  return counter == ARRAY_LEN;
}
