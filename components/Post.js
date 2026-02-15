import { Link, Text, Flex, Box, useColorModeValue } from '@chakra-ui/react'
import NextLink from 'next/link'
import formatDate from '../utils/format-date'

export default function Post({ p, isLast }) {
    const link = `/articles/${p.slug}`
    const borderColor = useColorModeValue('gray.200', 'gray.800')
    const borderHoverColor = useColorModeValue('gray.300', 'gray.700')
    const titleColor = useColorModeValue('blue.600', 'blue.400')
    const descColor = useColorModeValue('gray.600', 'gray.400')
    const descHoverColor = useColorModeValue('gray.700', 'gray.300')
    const dateColor = useColorModeValue('gray.500', 'gray.500')
    const dateHoverColor = useColorModeValue('gray.600', 'gray.400')

    return (
        <NextLink href={link} passHref>
            <Link
                _hover={{ textDecoration: 'none' }}
                _focus={{ boxShadow: 'none' }}
                display="block"
                role="group"
            >
                <Box
                    borderBottom={!isLast && "1px"}
                    borderColor={borderColor}
                    pb={8}
                    transition="all 0.2s"
                    _groupHover={{
                        borderColor: borderHoverColor
                    }}
                >
                    <Flex direction="column" gap={3}>
                        <Text
                            color={titleColor}
                            fontSize="xl"
                            fontWeight="medium"
                            transition="all 0.2s"
                        >
                            {p.title}
                        </Text>

                        <Text
                            color={descColor}
                            fontSize="md"
                            lineHeight="tall"
                            transition="all 0.2s"
                            _groupHover={{ color: descHoverColor }}
                        >
                            {p.description}
                        </Text>

                        <Text
                            color={dateColor}
                            fontSize="sm"
                            transition="all 0.2s"
                            _groupHover={{ color: dateHoverColor }}
                        >
                            {formatDate(p.date)}
                        </Text>
                    </Flex>
                </Box>
            </Link>
        </NextLink>
    )
}
