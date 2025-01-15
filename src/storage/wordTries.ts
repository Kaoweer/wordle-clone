// main.ts or your file containing the class code
import { wordList } from './wordList';  // Corrected import

class TriesNode {
  children: (TriesNode | null)[];
  isEnd: boolean;

  constructor() {
    this.children = Array(26).fill(null);
    this.isEnd = false;
  }
}

class WordDictionary {
  root: TriesNode;

  constructor() {
    this.root = new TriesNode();
  }

  getIndex(c: string): number {
    return c.charCodeAt(0) - 'a'.charCodeAt(0);
  }

  addWord(word: string): void {
    let cur = this.root;
    for (const c of word) {
      const index = this.getIndex(c);
      if (!cur.children[index]) {
        cur.children[index] = new TriesNode();
      }
      cur = cur.children[index];
    }
    cur.isEnd = true;
  }

  search(word: string): boolean {
    const dfs = (cur: TriesNode, i: number, word: string): boolean => {
      if (i === word.length) {
        return cur.isEnd;
      }
      const index = this.getIndex(word[i]);
      if (cur.children[index] === null) {
        return false;
      }

      return dfs(cur.children[index], i + 1, word);
    };
    return dfs(this.root, 0, word);
  }
}

const triesDict = new WordDictionary();
for (const word of wordList) {
  triesDict.addWord(word);
}

console.log(triesDict);

export default triesDict;
