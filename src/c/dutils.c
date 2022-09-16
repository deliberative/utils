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

#include <math.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>
#include <stdlib.h>

#include "../../libsodium/src/libsodium/randombytes/randombytes.c"
#include "../../libsodium/src/libsodium/sodium/codecs.c"
#include "../../libsodium/src/libsodium/sodium/core.c"
#include "../../libsodium/src/libsodium/sodium/utils.c"

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

// Output is the index of the element
__attribute__((used)) int
item_in_array(const size_t ARRAY_LEN, const size_t ITEM_LEN,
              const uint8_t array[ARRAY_LEN * ITEM_LEN],
              const uint8_t item[ITEM_LEN])
{
  size_t i, j;

  for (i = 0; i < ARRAY_LEN; i++)
  {
    bool found = true;
    for (j = 0; j < ITEM_LEN; j++)
    {
      if (array[i * ITEM_LEN + j] != item[j])
      {
        found = false;
        break;
      }
    }

    if (found) return i;
  }

  return -1;
}

// Output is an array of indexes of the elements
__attribute__((used)) void
items_in_array(const size_t ARRAY_LEN, const size_t ITEMS_ARRAY_LEN,
               const size_t ITEM_LEN, const uint8_t array[ARRAY_LEN * ITEM_LEN],
               const uint8_t items[ITEMS_ARRAY_LEN * ITEM_LEN],
               int32_t indexes[ITEMS_ARRAY_LEN])
{
  size_t i, j, k;

  for (i = 0; i < ITEMS_ARRAY_LEN; i++)
  {
    // We start with all items unfound
    indexes[i] = -1;
  }

  if (ITEMS_ARRAY_LEN > ARRAY_LEN) return;

  int itemsFound = 0;
  for (i = 0; i < ARRAY_LEN; i++)
  {
    if (itemsFound == ITEMS_ARRAY_LEN) return;

    for (j = 0; j < ITEMS_ARRAY_LEN; j++)
    {
      bool found = true;
      for (k = 0; k < ITEM_LEN; k++)
      {
        if (array[i * ITEM_LEN + k] != items[j * ITEM_LEN + k])
        {
          found = false;
          break;
        }
      }

      if (found)
      {
        if (indexes[j] == -1)
        {
          indexes[j] = i;
          itemsFound++;

          break;
        }
        else
        {
          // Duplicate item found
          indexes[j] = -2;

          return;
        }
      }
    }
  }
}

__attribute__((used)) int
occurrences_in_array(const size_t ARRAY_LEN, const size_t ITEM_LEN,
                     const uint8_t array[ARRAY_LEN * ITEM_LEN],
                     const uint8_t item[ITEM_LEN])
{
  size_t i, j;
  int counter = 0;

  for (i = 0; i < ARRAY_LEN; i++)
  {
    bool found = true;
    for (j = 0; j < ITEM_LEN; j++)
    {
      if (array[i * ITEM_LEN + j] != item[j])
      {
        found = false;
        break;
      }
    }

    if (found) counter += 1;
  }

  return counter;
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

__attribute__((used)) int
random_bytes(const int SIZE, uint8_t array[SIZE])
{
  randombytes_buf(array, SIZE);

  return 0;
}

__attribute__((used)) int
random_number_in_range(const int MIN, const int MAX)
{
  size_t i;

  const int RANGE = MAX - MIN;
  const int BYTES_NEEDED = ceil(log2(RANGE) / 8);
  const int MAX_RANGE = pow(pow(2, 8), BYTES_NEEDED);
  const int EXTENDED_RANGE = floor(MAX_RANGE / RANGE) * RANGE;

  uint8_t *randomBytes = malloc(BYTES_NEEDED * sizeof(uint8_t));

  int randomInteger = EXTENDED_RANGE;
  while (randomInteger >= EXTENDED_RANGE)
  {
    randombytes_buf(randomBytes, BYTES_NEEDED);

    randomInteger = 0;
    for (i = 0; i < BYTES_NEEDED; i++)
    {
      randomInteger <<= 8;
      randomInteger += randomBytes[i];
    }

    if (randomInteger < EXTENDED_RANGE)
    {
      free(randomBytes);
      randomInteger %= RANGE;

      return MIN + randomInteger;
    }
  }

  free(randomBytes);

  return randomInteger;
}
