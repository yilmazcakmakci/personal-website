import { Link, Text, Flex, HStack, Tag, Image } from '@chakra-ui/react'
// import Image from './Image'
import NextLink from 'next/link'
import formatDate from '../utils/format-date'
import slug from 'slug'
import readTime from '../utils/readtime'

export default function Projects({ p, page }) {
    return (
        <NextLink href={`/${page}/${p.slug}`} passHref>
            <Link
                _focus={{ boxShadow: 'none' }}
                _hover={{ backgroundColor: 'gray.800' }}
                borderRadius={6}
                display={['block', 'block', 'flex']}
                p={4}
                w="full"
            >
                <Image
                    src={p.coverImage}
                    alt={p.title}
                    width={256}
                    height={192}
                    display={['none', 'none', 'block']}
                    borderRadius={4}
                />
                <Flex w="full" pl={[0, 0, 8]} mt={[4, 4, 0]} direction="column">
                    <Flex justify="space-between" display={['block', 'block', 'flex']}>
                        <Text fontSize={[20, 24]} fontWeight="semibold">{p.title}</Text>
                        {/* <HStack spacing={4}>
                            {
                                p.tags.map(tag => (
                                    <Tag key={tag} colorScheme="teal" variant="subtle" size="sm">{tag}</Tag>
                                ))
                            }
                        </HStack> */}
                    </Flex>
                    <Text display="block" as="i" fontSize={12}>{formatDate(p.date)} {p.page === 'articles' && `· ${readTime(p.content)} min read`}</Text>
                    <Text mt={[4, 4, 'auto']} fontSize={16} noOfLines={2}>{p.excerpt}</Text>
                </Flex>
            </Link>
        </NextLink>
    )
}
