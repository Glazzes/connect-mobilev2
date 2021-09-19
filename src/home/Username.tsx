import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'

type UsernameProps = {
  searchParam: string;
  text: string;
}

type TextMatch = {
  matches: boolean;
  text: string;
}

const Username: React.FC<UsernameProps> = ({text, searchParam}) => {
  const [words, setWords] = useState<TextMatch[]>([{matches: false, text}]);

  useEffect(() => {
    const splitted = text.toLocaleLowerCase()
      .split(searchParam.toLocaleLowerCase());

    const result: TextMatch[] = [];
  
    for (let i = 0; i < splitted.length; i++) {
      if(searchParam === text) {
        result.push({matches: true, text: searchParam});
        break;
      }

      if (splitted[i] === ''){
        result.push({matches: true, text: searchParam});
      }else{
        result.push({matches: false, text: splitted[i]});

        if(splitted[i+1] != undefined && splitted[i + 1] != ''){
          result.push({matches: true, text: searchParam});
        }
      }
    }

    capitalize(result);
    setWords(result);
  }, [searchParam]);

  const capitalize = (matches: TextMatch[]) => {
    const firstWord = matches[0].text
      .substring(0, 1)
      .toUpperCase();

    const rest = matches[0].text
    .substring(1, matches[0].text.length)
    .toLowerCase();

    matches[0] = {...matches[0], text: `${firstWord}${rest}`}
  }

  return (
    <>
      <Text 
        style={styles.enclosingText} 
        numberOfLines={1} 
        ellipsizeMode={'tail'}
      >
        {
          words.map((textMatch, index) => {
            return (
            <Text
              key={`text-match-${index}`}
              style={textMatch.matches ? styles.matchText : styles.regularText}
            >
                {textMatch.text}
            </Text>
            )
          })
        }
      </Text>  
    </>  
  )
}

export default Username;

const styles = StyleSheet.create({
  enclosingText: {
    fontWeight: '700',
    fontSize: 15
  }, 
  matchText: {
    color: 'lightblue', 
  },
  regularText: {
    color: 'white',
  }
});