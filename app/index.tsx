import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';

// List of words to be used in the game
const words: string[] = ["react", "native", "javascript", "android", "compose", "champion", "talent", "close", "compose", "react", "native", "javascript", "android", "champion", "talent", "close"];

function shuffleWord(word: string): string {
  return word.split('').sort(() => Math.random() - 0.5).join('');
}

export default function App() {
  const [currentWord, setCurrentWord] = useState<string>(shuffleWord(words[0]));
  const [userInput, setUserInput] = useState<string>('');
  const [score, setScore] = useState<number>(0);
  const [wordIndex, setWordIndex] = useState<number>(0);
  const [wordsPlayed, setWordsPlayed] = useState<number>(0);

  function handleCheckAnswer() {
    if (userInput.toLowerCase() === words[wordIndex]) {
      setScore(score + 1);
    }
    nextWord();
  }

  function handleSkipWord() {
    nextWord();
  }

  function nextWord() {
    const nextIndex = wordIndex + 1;
    if (nextIndex < words.length && wordsPlayed < 10) {
      setWordIndex(nextIndex);
      setCurrentWord(shuffleWord(words[nextIndex]));
      setUserInput('');
      setWordsPlayed(wordsPlayed + 1);
    } else {
      // Game over, reset the game
      Alert.alert(`Game over! Your score is ${score}`);
      setWordIndex(0);
      setCurrentWord(shuffleWord(words[0]));
      setUserInput('');
      setScore(0);
      setWordsPlayed(0);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.word}>{currentWord}</Text>
      <TextInput
        style={styles.input}
        value={userInput}
        onChangeText={setUserInput}
      />
      <Button title="Check Answer" onPress={handleCheckAnswer} />
      <Button title="Skip Word" onPress={handleSkipWord} />
      <Text>Score: {score}</Text>
      <Text>Words Played: {wordsPlayed}/10</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  word: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '80%',
  },
});
