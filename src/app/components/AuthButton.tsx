import { Button, HStack, IconButton, Text, Avatar } from '@chakra-ui/react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { FiLogIn, FiLogOut } from 'react-icons/fi';

const UserProfile = () => {
    const { data: session } = useSession();

    return (
        <HStack spacing={4} align="center">
            {session ? (
                <>
                    <Avatar name={session.user?.name || 'User'} src={session.user?.image || ''} />
                    <Text fontWeight="bold">{session.user?.name}</Text>
                    <Button
                        colorScheme="red"
                        leftIcon={<FiLogOut />}
                        onClick={() => signOut()}
                    >
                        Sign out
                    </Button>
                </>
            ) : (
                <Button
                    colorScheme="blue"
                    leftIcon={<FiLogIn />}
                    onClick={() => signIn()}
                >
                    Sign in
                </Button>
            )}
        </HStack>
    );
};

export default UserProfile;
