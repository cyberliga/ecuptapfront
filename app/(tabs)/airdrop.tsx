import { View, StyleSheet } from 'react-native';
import { Text, Button, styled } from 'tamagui';
import { ChevronRight } from '@tamagui/lucide-icons';
import { useState } from 'react';
import { RoadMap } from '@/components/RoadMap';

export default function AirDropTab() {
    const [showTab , setShowTab] =  useState(false);
    const data = [
        {
            title: 'Our Roadmap',
        },
    ];
    const seShowTab = () => {
        setShowTab(true);
    };
    const setCloseTab = () => {
        setShowTab(false);
    }
    console.log(showTab)
    return !showTab ? (
        <View style={styles.container}>
            <Text style={styles.title}>
                AirDrop
            </Text>
            <Text style={styles.subTitle}>
                Listing on its way. Information will appear below.
            </Text>
            {data.map((item, index) => (
                <Button key={index} style={styles.box}
                    onPress={seShowTab}>
                    <Text style={styles.buttonTitle}>
                        {item.title}
                    </Text>
                    <ChevronRight size="$2" color='#FFFFFF' />
                </Button>
            ))}
        </View>
    ): <RoadMap setCloseTab={setCloseTab} />;
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
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
    buttonTitle: {
        color: "#4EF2FF",
        fontSize: 14,
        fontWeight: 500,
        lineHeight: 15.82,
        fontFamily: 'Inter',
    }, 
    box : {
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: "#171C26",
        borderRadius: 8,
        borderWidth: 1,
        width: "100%",
        borderColor: '#2D3748',
        padding: 16,
        margin: 10,
        height: 62,
    },
});

// const AirDropTabItem = styled(View, {
//     ...getTokens().airDropItem,
// })
