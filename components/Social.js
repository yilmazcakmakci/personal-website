import { HStack, IconButton, Link } from '@chakra-ui/react'
import { FaLinkedinIn, FaMediumM, FaGithub, FaTwitter } from 'react-icons/fa'
import { GrMail } from 'react-icons/gr'

const size = 16

const socialMediaLinks = [
    {
        name: 'twitter',
        icon: <FaTwitter size={size} />,
        url: 'https://twitter.com/yilmazdev'
    },
    {
        name: 'linkedin',
        icon: <FaLinkedinIn size={size} />,
        url: 'https://www.linkedin.com/in/yilmazcakmakci/'
    },
    {
        name: 'medium',
        icon: <FaMediumM size={size} />,
        url: 'https://medium.com/@yilmazcakmakci'
    },
    {
        name: 'github',
        icon: <FaGithub size={size} />,
        url: 'https://github.com/yilmazcakmakci'
    },
    {
        name: 'mail',
        icon: <GrMail size={size} />,
        url: 'mailto:cakmakcy@gmail.com'
    }
]

const Social = () => {
    return (
        <HStack spacing={4} mt={2}>
            {
                socialMediaLinks.map(({ name, url, icon }) => (
                    <IconButton key={name} borderRadius="full" _hover={{color:'teal.400'}} bg="gray.800" title={name} as={Link} isExternal href={url}>
                        {icon}
                    </IconButton>
                ))
            }
        </HStack>
    )
}

export default Social