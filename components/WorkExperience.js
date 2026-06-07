import { Box, Heading, Text, Flex, useColorModeValue, HStack } from '@chakra-ui/react'

/**
 * WorkExperience – simple experience cards
 *
 * Design: minimal, matches project styling. Light/dark theme support.
 */
function ExperienceCard({ experience, isLast }) {
    const headingColor = useColorModeValue('gray.800', 'gray.200')
    const textColor = useColorModeValue('gray.700', 'gray.300')
    const smallTextColor = useColorModeValue('gray.500', 'gray.600')
    const chipBg = useColorModeValue('gray.200', 'gray.700')
    const chipText = useColorModeValue('gray.700', 'gray.300')
    const separatorColor = useColorModeValue('gray.200', 'gray.700')
    const bulletColor = useColorModeValue('blue.600', 'blue.400')

    const { company, role, dates, summary, impacts, techStack } = experience

    return (
        <Box
            as="article"
            pb={isLast ? 0 : 5}
            mb={isLast ? 0 : 5}
            borderBottomWidth={isLast ? 0 : 1}
            borderColor={separatorColor}
        >
            <Heading as="h3" size="md" color={headingColor} mb={0}>
                {company}
            </Heading>
            <Text fontWeight="600" color={textColor} fontSize="sm" mb={1}>
                {role}
            </Text>
            <Text as="time" fontSize="xs" color={smallTextColor} display="block" mb={3}>
                {dates}
            </Text>

            <Text color={textColor} fontSize="sm" lineHeight="tall" mb={3}>
                {summary}
            </Text>

            <Box as="ul" listStyleType="none" m={0} p={0} mb={3}>
                {impacts.map((impact, i) => (
                    <Flex key={i} as="li" align="flex-start" gap={2} mb={1}>
                        <Text as="span" color={bulletColor} flexShrink={0} aria-hidden>
                            •
                        </Text>
                        <Text color={textColor} fontSize="sm" lineHeight="tall">
                            {impact}
                        </Text>
                    </Flex>
                ))}
            </Box>

            <HStack flexWrap="wrap" gap={1.5}>
                {techStack.map((tech) => (
                    <Box
                        key={tech}
                        as="span"
                        px={1.5}
                        py={0.5}
                        borderRadius="md"
                        fontSize="xs"
                        fontWeight="500"
                        bg={chipBg}
                        color={chipText}
                    >
                        {tech}
                    </Box>
                ))}
            </HStack>
        </Box>
    )
}

export default function WorkExperience({ experiences, sectionTitle = 'Work Experience' }) {
    const headingColor = useColorModeValue('gray.800', 'gray.200')

    return (
        <Box as="section" id="experience" px={4} py={12} aria-labelledby="experience-heading">
            <Heading id="experience-heading" size="md" color={headingColor} mb={6}>
                {sectionTitle}
            </Heading>

            <Box>
                {experiences.map((exp, i) => (
                    <ExperienceCard
                        key={`${exp.company}-${exp.role}`}
                        experience={exp}
                        isLast={i === experiences.length - 1}
                    />
                ))}
            </Box>
        </Box>
    )
}
