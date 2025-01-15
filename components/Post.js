import { Link, Text, Flex, Box } from '@chakra-ui/react'
import NextLink from 'next/link'
import formatDate from '../utils/format-date'

export default function Post({ p }) {
    const link = `/articles/${p.slug}`

    return (
        <NextLink href={link} passHref>
            <Link
                _hover={{ textDecoration: 'none' }}
                _focus={{ boxShadow: 'none' }}
                display="block"
                role="group"
            >
                <Box
                    borderBottom="1px"
                    borderColor="gray.800"
                    pb={8}
                    transition="all 0.2s"
                    _groupHover={{
                        borderColor: 'gray.700'
                    }}
                >
                    <Flex direction="column" gap={3}>
                        <Text
                            color="cyan.400"
                            fontSize="xl"
                            fontWeight="medium"
                            transition="all 0.2s"
                        >
                            {p.title}
                        </Text>

                        <Text
                            color="gray.400"
                            fontSize="md"
                            lineHeight="tall"
                            transition="all 0.2s"
                            _groupHover={{ color: 'gray.300' }}
                        >
                            {p.description}
                        </Text>

                        <Text
                            color="gray.500"
                            fontSize="sm"
                            transition="all 0.2s"
                            _groupHover={{ color: 'gray.400' }}
                        >
                            {formatDate(p.date)}
                        </Text>
                    </Flex>
                </Box>
            </Link>
        </NextLink>
    )
}
