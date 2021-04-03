import { Link, Text, Flex, Image } from '@chakra-ui/react'
import NextLink from 'next/link'
import formatDate from '../utils/format-date'
import readTime from '../utils/readtime'

export default function Post({ p, page }) {
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
                    src={p.media}
                    alt={p.title}
                    width={256}
                    height={192}
                    display={['none', 'none', 'block']}
                    borderRadius={4}
                />
                <Flex w="full" pl={[0, 0, 8]} mt={[4, 4, 0]} direction="column">
                    <Flex justify="space-between" display={['block', 'block', 'flex']}>
                        <Text fontSize={[20, 24]} fontWeight="semibold">{p.title}</Text>
                    </Flex>
                    <Text display="block" as="i" fontSize={12}>{formatDate(p.date)}</Text>
                    <Text mt={[4, 4, 'auto']} fontSize={16} noOfLines={2}>{p.description}</Text>
                </Flex>
            </Link>
        </NextLink>
    )
}
