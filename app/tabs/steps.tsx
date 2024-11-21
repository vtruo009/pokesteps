import { Text, View, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react'

export default function StepsHomeScreen() {
    const[todaySteps, setTodaySteps] = useState(0)
    const[yesterdaySteps, setYesterdaySteps] = useState(0)

//Example w/o real data
    useEffect( () => {
        //Today's Steps
        const fetchStepData = async () => {
            const fetchedTodaySteps = 3932 //Example step count
            setTodaySteps(fetchedTodaySteps);

        //Yesterdays's Steps
        const fetchedYesterdaySteps = 8221;
        setYesterdaySteps(fetchedYesterdaySteps);
        };

        fetchStepData();
    },[]);
    return (
        <View style={styles.container}>
            <View style={styles.todayContainer}>
                <Text style={styles.todayStepCount}>{todaySteps.toLocaleString()}</Text>
                <Text style={styles.todayText}>steps</Text>
            </View>
            <View style={styles.yesterdayContainer}>
                <Text style={styles.yesterdayStepCount}>{yesterdaySteps.toLocaleString()}</Text>
                <Text style={styles.yesterdayText}>yesterday</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
container:{
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
},
todayContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 250,
},
todayStepCount: {
    color: '#000',
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: -5,
},
todayText: {
    color: '#000',
    fontSize: 20,
    marginBottom: 10,
},
yesterdayContainer: {
    marginBottom: 100,
    alignItems: 'center',
},
yesterdayStepCount: {
    color: '#000',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: -5,
},
yesterdayText: {
    color: '#000',
    fontSize: 10,
    marginBottom: 10,
},

});