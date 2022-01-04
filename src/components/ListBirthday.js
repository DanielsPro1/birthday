import React, {useState, useEffect} from 'react';
import {View, StyleSheet,Text} from 'react-native';
import AddBirtday from './AddBirtday';
import ActionBar from './ActionBar';
import firebase from '../utils/firebase';
import "firebase/firestore";

firebase.firestore().settings({experimentalForceLongPolling: true});
const db = firebase.firestore(firebase)

export default function Listbirthday(props){
    
    const{user}= props;
    const[showList, setShowList]= useState(true);
    const [birthday, setBirthday] = useState([]);
    const [pasaBirthday, setPasaBirthday] = useState([]);
    console.log(birthday)

    useEffect(() => {
        setBirthday([]);
        setPasaBirthday([]);
        db.collection(user.uid)
          .orderBy("dateBirth", "asc")
          .get()
          .then((response) => {
            const itemsArray =[];
            response.forEach((doc)=>{
                const data = doc.data();
                data.id =doc.id
                itemsArray.push(data);
            })
            formData(itemsArray);

          });
   
    },[])

    const formData =(items) => {



    }
    return (
        <View style={styles.container}>
            {showList ? (
                <>
                    <Text>List Birtday</Text> 
                    <Text>List Birtday</Text>
                    <Text>List Birtday</Text>
                    <Text>List Birtday</Text>
                    <Text>List Birtday</Text>
                </>
            ) : (
                <AddBirtday user={user} setShowList={setShowList}/>
            )}
            
            <ActionBar showList={showList} setShowList={setShowList}/>   
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        alignItems:"center",
        height:"100%",

    }
})


