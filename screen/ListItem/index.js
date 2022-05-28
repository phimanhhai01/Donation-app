import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
const ListItem = () => { 
    const rows = [1, 2, 3, 4, 5];
    const nav = useNavigation();
    const goback = () => {
        nav.navigate('Donation 1.0');
    }
    return (
        //<SafeAreaView>
            <View>
                <View style={styles.headers}>
                    <Text style={styles.headerText}>Donation 5.0</Text>
                    <TouchableOpacity onPress={goback}>
                        <Icon name="left" size={24} color="white"/>
                    </TouchableOpacity>
                </View>
                <View style={styles.reportField}>
                    <Text style={styles.report}>Report</Text>
                    {rows.map((element, index) => {
                        return (
                            <View key={index}>
                                <Text>{`Item ${index}`}</Text>
                                <Text>{`Sub Item ${index}`}</Text>
                            </View>
                        );
                    })}
                </View>
            </View>
        //</SafeAreaView>
    )
}


const styles = StyleSheet.create({
    headers:{
        marginTop: 30,
        paddingHorizontal: 12,
        paddingVertical: 12,
        backgroundColor: '#496791',
        height: '20%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerText:{
        color: 'white',
        fontSize: 24
    },
    report: {
        fontSize: 24
    },
    reportField: {
        padding: 12
    }
})

export default ListItem;