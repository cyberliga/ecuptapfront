import { View, StyleSheet } from 'react-native';
import { Text } from 'tamagui'
import { useQuery } from '../api/hooks/useQuery';
import { Tasks } from '@/app/api/schema'
import Loader from '@/components/Loader';
import TaskComponent from "@/components/Tasks/Task"
import MainButton from '@/components/Buttons/MainButton';
import { Button } from 'tamagui';
import MainButtonContent from "@/components/MainButtonContent"

export default function AirDropTab() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                AirDrop
            </Text>
            <Text style={styles.subTitle}>
                Listing on its way. Information will appear below.
            </Text>
            <Button style={styles.button}>
                <Text style={styles.buttonTitle}>
                    Our Roadmap
                </Text>
            </Button>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        display: 'flex',
        alignItems: 'center',
        gap: 18,
        backgroundColor: '#171C26',
    },
    title: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: '700',
        lineHeight: 27.12,
        fontFamily: 'Inter',
    },
    subTitle: {
        color: '#EBEBEB',
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 18.08,
        fontFamily: 'Inter',
    },
    tasksWrapper: {
        paddingTop: 50,
        display: 'flex',
    },
    button: {
        padding: 0,
        margin: 10,
        width: "100%",
        height: 62,
        borderRadius: 8,
        borderWidth: 0,
        cursor: "pointer",
        opacity: 0.8,
        backgroundColor: "#171C26",
    },
    buttonTitle: {
        color: "#4EF2FF",
        fontSize: 14,
        fontWeight: 500,
        lineHeight: 15.82,
        textAlign: "left"
    }
});