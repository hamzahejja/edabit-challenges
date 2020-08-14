import java.text.DecimalFormat;
import java.util.*;
import java.util.regex.Pattern;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@SuppressWarnings("ALL")
public class Challenge {
    public static boolean isPrime(int n) {
        if (n < 2) {
            return false;
        }

        boolean isPrime = true;
        for (int i = 2; i < n; i++) {
            if (n % i == 0) {
                isPrime = false;
                break;
            }
        }

        return isPrime;
    }

    public static int firstIndex(String hex, String needle) {
        StringBuilder stringBuilder = new StringBuilder("");
        Arrays.stream(hex.split(" "))
                .map(str -> (char) Integer.valueOf(str, 16).intValue())
                .forEach(ch -> stringBuilder.append(ch));

        return stringBuilder.toString().indexOf(needle);
    }
    public static String unmix(String str) {
        StringBuilder stringBuilder = new StringBuilder(str);
        for (int index = 0; index < str.length() - 1; index += 2) {
            stringBuilder.replace(index, index + 2, String.valueOf(new char[]{ str.charAt(index + 1), str.charAt(index) }));
        }

        return stringBuilder.toString();
    }
    public static int bugger(int num) {
        int count = 0;
        while (num % 10 != num) {
            count++;
            num = String.valueOf(num)
                    .chars()
                    .map(ch -> ch - '0')
                    .reduce((int acc, int n) -> acc * n)
                    .getAsInt();
        }

        return count;
    }

    public static String noYelling(String phrase) {
        return phrase.replaceAll(
                "(!+$)|(\\?+$)",
                String.valueOf(phrase.charAt(phrase.length() - 1))
        );
    }

    public static long celciusToFahrenheit(int deg) {
        return Math.round(deg * 1.8 + 32);
    }

    public static long fahrenheitToCelcius (int deg) {
        return Math.round((deg - 32) / 1.8);
    }

    public static String convert(String deg) {
        if (! deg.matches("^-?\\d+\\*([FC])$")) return "Error";

        StringBuilder stringBuilder = new StringBuilder("");
        char measuringSystem = Character.toLowerCase(deg.charAt(deg.length() - 1));
        int temperature = Integer.parseInt(deg.substring(0, deg.indexOf('*')));

        if (measuringSystem == 'c') {
            stringBuilder.append(celciusToFahrenheit(temperature)).append('*').append('F');
        } else {
            stringBuilder.append(fahrenheitToCelcius(temperature)).append('*').append('C');
        }

        return stringBuilder.toString();
    }

    public static boolean isPowerful(int num) {
        return IntStream.range(2, num - 1)
                .filter(n -> isPrime(n) && num % n == 0)
                .allMatch(pf -> num % (pf * pf) == 0);
    }

    public static int battleOutcome(int num) {
        char[] charsArray = String.valueOf(num).toCharArray();
        StringBuilder resultStrBuilder = new StringBuilder("");

        for (int index = 0; index < charsArray.length; index += 2) {
            if (index == charsArray.length - 1) {
                resultStrBuilder.append(charsArray[index]);
            } else if (charsArray[index] > charsArray[index + 1]) {
                resultStrBuilder.append(charsArray[index]);
            } else if (charsArray[index] < charsArray[index + 1]) {
                resultStrBuilder.append(charsArray[index + 1]);
            }
        }

        return Integer.parseInt(resultStrBuilder.toString());
    }

    public static String reverseOdd(String str) {
        return Arrays.stream(str.split(" "))
                .map(word -> word.length() % 2 == 0 ? word : new StringBuilder(word).reverse().toString())
                .collect(Collectors.joining(" "));
    }

    // Reverse Letters, Keep Numbers in Place.
    public static String reverse(String str) {
        StringBuilder reversedLettersBuilder = new StringBuilder(
                str.chars()
                .filter(Character::isAlphabetic)
                .mapToObj(Character::toString)
                .collect(Collectors.joining(""))
        ).reverse();

        for (int index = 0; index < str.length(); index++) {
            if (Character.isDigit(str.charAt(index))) {
                reversedLettersBuilder.insert(index, str.charAt(index));
            }
        }

        return reversedLettersBuilder.toString();
    }

    public static String missingLetter(String[] arr) {
        StringBuilder result = new StringBuilder("");

        for (int index = 0; index < arr.length - 1; index++) {
            if (arr[index].compareTo(arr[index + 1]) != -1) {
                result.append(Character.toString(arr[index].codePointAt(0) + 1));
            }
        }

        return result.toString();
    }

    public static boolean isCorrectInequalityExpression(int lhsOperand, int rhsOperand, char sign) {
        return (sign == '<') == (lhsOperand < rhsOperand);
    }

    public static boolean correctSigns(String str) {
        char[] signs = str.replaceAll("[\\d\\s]", "").toCharArray();
        int[] operands = Arrays
                .stream(str.split("[<>]"))
                .mapToInt(operandStr -> Integer.parseInt(operandStr.trim()))
                .toArray();

        return IntStream.range(0, operands.length - 1)
                .allMatch(index -> isCorrectInequalityExpression(operands[index], operands[index + 1], signs[index]));
    }

    public static String mangle(String str) {
        char temp, currentChar;
        String vowels = "aeiou";
        StringBuilder resultStrBuilder = new StringBuilder("");

        for (int i = 0; i < str.length(); i++) {
            currentChar = str.charAt(i);
            if (Character.isLetter(currentChar)) {
                temp = currentChar == 'z' ? 'a' :
                        (currentChar == 'Z') ? 'A': (char) (str.codePointAt(i) + 1);
                resultStrBuilder.append(vowels.indexOf(temp) != -1 ? Character.toUpperCase(temp) : temp);
            } else {
                resultStrBuilder.append(str.charAt(i));
            }
        }

        return resultStrBuilder.toString();
    }

    public static int[] characterMapping(String str) {
        Map<Character,Integer> charIndicesMapping = new HashMap<>();
        return IntStream.range(0, str.length())
                .map(index -> {
                    if (charIndicesMapping.containsKey(str.charAt(index))) {
                        return charIndicesMapping.get(str.charAt(index));
                    }

                    final int lastSeenUniqueIndex = charIndicesMapping.isEmpty() ? -1 :
                            charIndicesMapping.values()
                                    .stream()
                                    .mapToInt(v -> v).max()
                                    .getAsInt();

                    charIndicesMapping.put(str.charAt(index), lastSeenUniqueIndex + 1);
                    return lastSeenUniqueIndex + 1;
                }).toArray();
    }

    public static int duplicateCount(String str) {
        Map<Character, Integer> charactersCountMapping = new HashMap<>();

        str.chars().forEach(codePoint -> {
            final char currentCharacter = (char) codePoint;
            charactersCountMapping.put(
                    currentCharacter,
                    charactersCountMapping.getOrDefault(currentCharacter, 0) + 1
            );
        });

        return Long.valueOf(
                charactersCountMapping.values()
                    .stream()
                    .filter(occurrences -> occurrences > 1)
                    .count()
        ).intValue();
    }

    public static String erase(String str) {
        StringBuilder resultBuilder = new StringBuilder("");

        for (char c: str.toCharArray()) {
            if (c != '#') {
                resultBuilder.append(c);
            } else if (! resultBuilder.toString().isEmpty()){
                resultBuilder.deleteCharAt(resultBuilder.length() - 1);
            }
        }

        return resultBuilder.toString();
    }

    public static String semiprime(int n) {
        final String NEITHER = "Neither";
        final String SEMIPRIME = "Semiprime";
        final String SQUAREFREE_SEMIPRIME = "Squarefree Semiprime";

        int[] primeFactors = IntStream
                .range(2, n)
                .filter(e -> n % e == 0 && isPrime(e))
                .toArray();

        if (primeFactors.length == 1) {
            return primeFactors[0] * primeFactors[0] == n ?
                    SEMIPRIME : NEITHER;
        } else if (primeFactors.length == 2) {
            return primeFactors[0] * primeFactors[1] == n ?
                    SQUAREFREE_SEMIPRIME : NEITHER;
        }

        return NEITHER;
    }

    public static String commonLastVowel(String str) {
        Map<Character, Integer> lastVowelCountMap = new HashMap<>();

        Arrays.stream(str.split(" ")).forEach(word -> {
            Character lastVowel = word.charAt(
                    word.replaceAll("(?i)[aeiou]", "_")
                        .lastIndexOf('_')
            );
            lastVowelCountMap.put(lastVowel, lastVowelCountMap.getOrDefault(lastVowel, 0) + 1);
        });

        return String.valueOf(
                lastVowelCountMap.entrySet()
                    .stream()
                    .max((lhsEntry, rhsEntry) -> lhsEntry.getValue() > rhsEntry.getValue() ? 1 : -1)
                    .get()
                    .getKey()
        ).toLowerCase();
    }

    public static String afterPotion(String str) {
        String result = IntStream.range(0, str.length() - 1)
                .mapToObj(index -> {
                    if (Character.isDigit(str.charAt(index))) {
                        return str.charAt(index + 1) == 'A' ?
                                String.valueOf(str.charAt(index) - '0' + 1):
                                (str.charAt(index + 1) == 'B') ?
                                        String.valueOf(str.charAt(index) - '0' - 1):
                                        String.valueOf(str.charAt(index));
                    }

                    return String.valueOf(str.charAt(index));
                })
                .collect(Collectors.joining(""));

        return new StringBuilder(
                result.replaceAll("[AB]", "")
        ).append(str.charAt(str.length() - 1)).toString();
    }

    public static boolean isPalindrome(int num) {
        String numAsString = String.valueOf(num);

        return numAsString.compareTo(new StringBuilder(numAsString).reverse().toString()) == 0;
    }

    public static int closestPalindrome(int num) {
        int firstPalindromeAboveNumber = num + 1, firstPalindromeBelowNumber = num - 1;

        if (isPalindrome(num)) {
            return num;
        }

        while(! isPalindrome(firstPalindromeBelowNumber)) {
            firstPalindromeBelowNumber--;
        }

        while(! isPalindrome(firstPalindromeAboveNumber)) {
            firstPalindromeAboveNumber++;
        }

        return Math.abs(firstPalindromeBelowNumber - num) <= Math.abs(firstPalindromeAboveNumber - num) ?
                firstPalindromeBelowNumber : firstPalindromeAboveNumber;
    }

    public static String selectLetters(String s1, String s2) {
        StringBuilder selectedLettersBuilder = new StringBuilder("");

        for (int i = 0; i < Math.min(s1.length(), s2.length()); i++) {
            if (Character.isUpperCase(s2.charAt(i))) {
                selectedLettersBuilder.append(s1.charAt(i));
            }
        }

        for (int j = 0; j < Math.min(s1.length(), s2.length()); j++) {
            if (Character.isUpperCase(s1.charAt(j))) {
                selectedLettersBuilder.append(s2.charAt(j));
            }
        }

        return selectedLettersBuilder.toString();
    }

    public static int periodic(String str) {
        int termsCountBeforePeriodic = 0;
        int unifiedTermLength = str.length();
        String sumOfTermDigitsAsStr;

        Map<String, Integer> termsCountMap = new HashMap<>();

        while (! termsCountMap.containsKey(str)) {
            termsCountBeforePeriodic++;
            termsCountMap.put(str, termsCountMap.getOrDefault(str, 0) + 1);

            sumOfTermDigitsAsStr = String.valueOf(str.chars().reduce(0, (acc, codePoint) -> acc + codePoint - '0'));
            str = new StringBuilder(str).append(sumOfTermDigitsAsStr).substring(sumOfTermDigitsAsStr.length());
        }

        return termsCountBeforePeriodic;
    }

    public static boolean plusSign(String str) {
        return Long.valueOf(
                Pattern.compile("((?<=\\+)[a-zA-Z](?=\\+))")
                    .matcher(str)
                    .results()
                    .count()
        ).intValue() == Long.valueOf(str.chars().filter(Character::isLetter).count()).intValue();
    }

    public static boolean isAlphabeticallySorted(String sentence) {
        return Arrays.stream(sentence.split(" "))
                .anyMatch(str -> {
                    str = str.replaceAll("[^a-zA-Z]", "");

                    return str.length() >= 3 && str.chars()
                            .sorted()
                            .mapToObj(codePoint -> String.valueOf((char) codePoint))
                            .collect(Collectors.joining(""))
                            .compareTo(str) == 0;
                });
    }

    public static boolean isBrilliant(int n) {
        int[] primeFactors = IntStream
                .range(2, n)
                .filter(e -> n % e == 0 && isPrime(e))
                .toArray();

        if (primeFactors.length == 1) {
            return primeFactors[0] * primeFactors[0] == n;
        } else if (primeFactors.length == 2) {

            return primeFactors[0] * primeFactors[1] == n &&
                    String.valueOf(primeFactors[0]).length() == String.valueOf(primeFactors[1]).length();
        }

        return false;
    }

    public static int sumOfSquaredDigits(int num) {
        return String.valueOf(num)
                .chars()
                .map(codePoint -> codePoint - '0')
                .reduce(0, (acc, val) -> acc + (val * val));
    }

    public static String happyAlgorithm(int num) {
        int numberOfStepsNeeded = 0;
        final String SAD_STR = "SAD";
        final String HAPPY_STR = "HAPPY";
        boolean enteredInfiniteLoop = false;
        Set<Integer> observedNumbers = new HashSet<>();

        do {
            if (observedNumbers.contains(num)) {
                enteredInfiniteLoop = true;
                break;
            }

            numberOfStepsNeeded++;
            observedNumbers.add(num);
            num = String.valueOf(num)
                    .chars()
                    .map(codePoint -> codePoint - '0')
                    .reduce(0, (acc, val) -> acc + (val * val));
        } while (num != 1);

        return enteredInfiniteLoop ?
                new StringBuilder(SAD_STR).append(" ").append(numberOfStepsNeeded).toString():
                new StringBuilder(HAPPY_STR).append(" ").append(numberOfStepsNeeded).toString();
    }

    public static String sigilize(String desire) {
        return desire.replaceAll("((?i)[a-z])(?=.*\\1)|\\s|((?i)[aeiou])", "").toUpperCase();
    }

    public static String swapTwo(String str) {
        StringBuilder result = new StringBuilder();
        int index = 0;

        while (index + 4 <= str.length()) {
            result.append(str.substring(index + 2, index + 4)).append(str.substring(index, index + 2));
            index += 4;
        }

        return result.append(str.substring(index)).toString();
    }

    public static boolean happy(int num) {
        boolean isHappy = true;
        Set<Integer> observedNumbers = new HashSet<>();

        do {
            if (observedNumbers.contains(num) || num == 4) {
                isHappy = false;
                break;
            }

            observedNumbers.add(num);
            num = String.valueOf(num)
                    .chars()
                    .map(codePoint -> codePoint - '0')
                    .reduce(0, (acc, val) -> acc + (val * val));
        } while(num != 1);

        return isHappy;
    }

    public static String truncate(String str, int length) {
        String regex = new StringBuilder("(^.{1,")
                .append(length)
                .append("}((?=\\s)|(?!.)))(.*)$")
                .toString();

        return str.matches(regex) ?
                str.replaceAll(regex, "$1") : "";
    }

    public static String BMI(String weight, String height) {
        final double INCHES_TO_METERS = 0.0254;
        final double POUNDS_TO_KILOS = 0.453592;

        String[] weightSpecifications = weight.split(" ");
        String[] heightSpecifications = height.split(" ");

        double weightKilos = weightSpecifications[1].equals("kilos") ?
                Double.parseDouble(weightSpecifications[0]) :
                Double.parseDouble(weightSpecifications[0]) * POUNDS_TO_KILOS;

        double heightMeters = heightSpecifications[1].equals("meters") ?
                Double.parseDouble(heightSpecifications[0]) :
                Double.parseDouble(heightSpecifications[0]) * INCHES_TO_METERS;

        double bodyMassIndex = weightKilos/ (heightMeters * heightMeters);
        String formattedBodyMassIndex = new DecimalFormat(".#").format(bodyMassIndex);

        if (bodyMassIndex < 18.5) {
            return new StringBuilder(formattedBodyMassIndex).append(" Underweight").toString();
        } else if (bodyMassIndex <= 24.9) {
            return new StringBuilder(formattedBodyMassIndex).append(" Normal weight").toString();
        } else if (bodyMassIndex <= 29.9) {
            return new StringBuilder(formattedBodyMassIndex).append(" Overweight").toString();
        } else {
            return new StringBuilder(formattedBodyMassIndex).append(" Obesity").toString();
        }
    }

    public static boolean canBuild(String[] arr) {
        return IntStream.range(0, arr.length - 1)
                .allMatch(index -> {
                    String currentWord = arr[index];
                    String nextWord = arr[index + 1];
                    return new StringBuilder(currentWord).append(nextWord.charAt(nextWord.length() - 1)).toString().equals(nextWord) ||
                            new StringBuilder(String.valueOf(nextWord.charAt(0))).append(nextWord.charAt(0)).toString().equals(nextWord);
                });
    }

    public static boolean isModest(int num) {
        String numAsString = String.valueOf(num);

        return numAsString.length() >= 2 &&
                IntStream.rangeClosed(1, numAsString.length() - 1)
                    .anyMatch(index -> {
                        int leftPart = Integer.parseInt(numAsString.substring(0, index));
                        int rightPart = Integer.parseInt(numAsString.substring(index));

                        return rightPart != 0 && num % rightPart == leftPart;
                    });
    }

    public static boolean canBuild(String s1, String s2) {
        Map<Character, Integer> characterOccurencesMapOfFirstString = new HashMap<>();
        Map<Character, Integer> characterOccurencesMapOfSecondString = new HashMap<>();

        for (char ch: s1.replaceAll("\\s","").toCharArray()) {
            characterOccurencesMapOfFirstString.put(
                    ch,
                    characterOccurencesMapOfFirstString.getOrDefault(ch, 0) + 1
            );
        }

        for (char ch: s2.replaceAll("\\s","").toCharArray()) {
            characterOccurencesMapOfSecondString.put(
                    ch,
                    characterOccurencesMapOfSecondString.getOrDefault(ch, 0) + 1
            );
        }

        return characterOccurencesMapOfFirstString.keySet().stream().allMatch(ch -> {
            return characterOccurencesMapOfSecondString.getOrDefault(ch, 0) >= characterOccurencesMapOfFirstString.get(ch);
        });
    }

    public static int row(String str) {
        return IntStream.range(0, str.length()).reduce(0, (acc, index) -> {
            int charNumber = str.codePointAt(index) - (int) 'A' + 1;
            int val = charNumber * (int) Math.pow(26, str.length() - index - 1);

            return acc + val;
        });
    }

    public static String replace_nth(String txt, int nth, String old_char, String new_char) {
        if (nth <= 0) return txt;

        StringBuilder resultStringBuilder = new StringBuilder(txt);
        Map<Character, Integer> charOccurencesMap = new HashMap<>();

        for (int i = 0; i < txt.length(); i++) {
            if (String.valueOf(txt.charAt(i)).equals(String.valueOf(old_char)) && (charOccurencesMap.getOrDefault(txt.charAt(i), 0) + 1) % nth == 0) {
                resultStringBuilder.replace(i, i + 1, String.valueOf(new_char));
            }

            charOccurencesMap.put(txt.charAt(i), charOccurencesMap.getOrDefault(txt.charAt(i), 0) + 1);
        }

        return resultStringBuilder.toString();
    }

    public static boolean doesRhyme(String str1, String str2) {
        String lastWordOfFirstString = str1.substring(str1.lastIndexOf(' '))
                .replaceAll("[?!.,:]", "")
                .toLowerCase();

        String lastWordOfSecondString = str2.substring(str2.lastIndexOf(' '))
                .replaceAll("[?!.,:]", "")
                .toLowerCase();

        return lastWordOfFirstString.replaceAll("[^aieou]", "")
                .equals(lastWordOfSecondString.replaceAll("[^aieou]", ""));
    }

    public static String toCamelCase(String str) {
        List<String> parts = Arrays.asList(str.split("_"));

        return parts.subList(1, parts.size()).stream().reduce(parts.get(0), (acc, part) -> {
            String camelCasedPart = new StringBuilder(part.substring(1))
                    .insert(0, Character.toUpperCase(part.charAt(0)))
                    .toString();

            return new StringBuilder(acc).append(camelCasedPart).toString();
        });
    }

    public static String toSnakeCase(String str) {
        return Arrays.asList(str.replaceAll("([A-Z])"," $1").split(" "))
                .stream()
                .map(String::toLowerCase)
                .collect(Collectors.joining("_"));
    }

    public static int mysteryFunc(int num) {
        int sortedReversed = Integer.parseInt(new StringBuilder(String.valueOf(num)).reverse()
                .chars()
                .sorted()
                .mapToObj(cp -> String.valueOf((char) cp))
                .collect(Collectors.joining(""))
        );

        return num - sortedReversed;
    }

    public static String kixCode(String addr) {
        String[] parts = addr.split(",");

        return new StringBuilder(
                parts[parts.length - 1]
                        .trim()
                        .replaceAll("(\\d+)\\s([A-Z]{2}).*", "$1$2")
        ).append(
                parts[parts.length - 2]
                        .trim()
                        .replaceAll("([^\\d]*)\\s(\\d+.*)", "$2")
                        .replaceAll("[^\\w]", "X")
                        .toUpperCase()
        ).toString();
    }

    public static String overTime(double[] arr) {
        double
                startOfWorkingDay = arr[0],
                endOfWorkingDay = arr[1],
                hourlyRate = arr[2],
                overtimeMultiplier = arr[3],
                calculatedPay;

        if (startOfWorkingDay < 17) {
            calculatedPay = (endOfWorkingDay <= 17) ?
                    (endOfWorkingDay - startOfWorkingDay) * hourlyRate :
                    (17 - startOfWorkingDay) * hourlyRate + (endOfWorkingDay - 17) * hourlyRate * overtimeMultiplier;
        } else {
            calculatedPay = (endOfWorkingDay - startOfWorkingDay) * hourlyRate * overtimeMultiplier;
        }

        return String.format("$%.2f", calculatedPay);
    }

    public static String word_rank(String str) {
        int currentWordScore, indexOfHighestScoringWord = -1;
        int maxWordScore = Integer.MIN_VALUE;
        String[] words = str.split(" ");

        for (int index = 0; index < words.length; index++) {
            currentWordScore = words[index].toLowerCase()
                    .replaceAll("[^a-z]", "")
                    .chars()
                    .map(codePoint -> codePoint - (int) 'a' + 1)
                    .reduce(0, (acc, letterScore) -> acc + letterScore);

            if (currentWordScore > maxWordScore) {
                maxWordScore = currentWordScore;
                indexOfHighestScoringWord = index;
            }
        }

        return words[indexOfHighestScoringWord].replaceAll("[^a-zA-Z]", "");
    }

    public static long sumDigProd(long... numbers) {
        long num = Arrays.stream(numbers).reduce(Long::sum).getAsLong();

        while (num / 10 != 0) {
            num = String.valueOf(num).chars().map(codePoint -> codePoint - (int) '0').reduce(1, (acc, val) -> acc * val);
        }

        return num;
    }

    /**
     * The additive persistence of an integer, n, is the number of times
     * you have to replace n with the sum of its digits until
     * n becomes a single digit integer.
     * @param n
     * @return {int}
     */
    public static int additivePersistence(int n) {
        int numberOfIterations = 0;

        while (n / 10 != 0) {
            numberOfIterations++;

            n = String.valueOf(n)
                    .chars()
                    .map(Character::getNumericValue)
                    .sum();
        }

        return numberOfIterations;
    }

    /**
     * The multiplicative persistence of an integer, n, is the number of times
     * you have to replace n with the product of its digits until
     * n becomes a single digit integer.
     */
    public static long multiplicativePersistence(long n) {
        int numberOfIterations = 0;

        while (n / 10 != 0) {
            numberOfIterations++;

            n = String.valueOf(n)
                    .chars()
                    .mapToLong(Character::getNumericValue)
                    .reduce(1, (acc, digit) -> acc * digit);
        }

        return numberOfIterations;
    }

    public static String addStrNums(String num1, String num2) {
        if (num1.isEmpty() && num2.isEmpty()) {
            return String.valueOf(0);
        }

        int previousCarryFromLastSum = 0, tempSumResult;
        int minLength = Math.min(num1.length(), num2.length());
        int maxLength = Math.max(num1.length(), num2.length());
        String nonSummablePortion = maxLength == num1.length() ?
                num1.substring(0, maxLength - minLength - 1):
                num2.substring(0, maxLength - minLength - 1);

        StringBuilder resultStringBuilder = new StringBuilder("");

        for (int i = 1; i <= Math.min(num1.length(), num2.length()); i++) {
            if (! Character.isDigit(num2.charAt(num2.length() - i)) || ! Character.isDigit(num1.charAt(num1.length() - i))) {
                return String.valueOf(-1);
            }

            tempSumResult = Character.getNumericValue(num2.charAt(num2.length() - i)) +
                    Character.getNumericValue(num1.charAt(num1.length() - i)) +
                    previousCarryFromLastSum;


            previousCarryFromLastSum = tempSumResult / 10;
            resultStringBuilder.append(tempSumResult % 10);
        }

        return resultStringBuilder.append(
                maxLength == num1.length() ?
                        Character.getNumericValue(num1.charAt(maxLength - minLength - 1)) + previousCarryFromLastSum :
                        Character.getNumericValue(num2.charAt(maxLength - minLength - 1)) + previousCarryFromLastSum
        ).reverse().insert(0, nonSummablePortion).toString().replaceAll("^0+", "");
    }

    public static boolean sameLetterPattern(String str1, String str2) {
        if (str1.length() != str2.length()) return false;

        int firstUpdatedOccurencesCount, secondUpdatedOccurencesCount;
        HashMap<Character, Integer> firstStrCharsOccurences = new HashMap<>();
        HashMap<Character, Integer> secondStrCharsOccurences = new HashMap<>();

        for (int i = 0; i < str1.length(); i++) {
            firstUpdatedOccurencesCount = firstStrCharsOccurences.getOrDefault(str1.charAt(i), 0) + 1;
            secondUpdatedOccurencesCount = secondStrCharsOccurences.getOrDefault(str2.charAt(i), 0) + 1;

            if (firstUpdatedOccurencesCount != secondUpdatedOccurencesCount) {
                return false;
            }

            firstStrCharsOccurences.put(str1.charAt(i), firstUpdatedOccurencesCount);
            secondStrCharsOccurences.put(str2.charAt(i), secondUpdatedOccurencesCount);
        }

        return true;
    }

    public static String[] sameVowelGroup(String[] words) {
        final String nonVowelsRegex = "[^aeiou]";
        final String uniqueVowelsOfFirstWord = new TreeSet<String>(
                Arrays.asList(words[0].replaceAll(nonVowelsRegex, "").split(""))
        ).stream().collect(Collectors.joining(""));


        return Arrays.stream(words).filter(word -> {
            return new TreeSet<String>(
                    Arrays.asList(word.replaceAll(nonVowelsRegex, "").split(""))
            ).stream().collect(Collectors.joining("")).compareTo(uniqueVowelsOfFirstWord) == 0;
        }).collect(Collectors.toList()).toArray(String[]::new);
    }

    public static int maxPossible(int n1, int n2) {
        String firstNumberAsString = String.valueOf(n1);
        String descOrderedSecondNumber = Arrays
                .stream(String.valueOf(n2).split(""))
                .sorted(Comparator.reverseOrder())
                .collect(Collectors.joining(""));

        StringBuilder resultBuilder = new StringBuilder("");

        for (int i = 0, j = 0; i < firstNumberAsString.length(); i++) {
            if (j < descOrderedSecondNumber.length() && descOrderedSecondNumber.charAt(j) > firstNumberAsString.charAt(i)) {
                resultBuilder.append(descOrderedSecondNumber.charAt(j));
                j++;
            } else {
                resultBuilder.append(firstNumberAsString.charAt(i));
            }
        }

        return Integer.parseInt(resultBuilder.toString());
    }

    public static int digitalRoot (int number) {
        while (String.valueOf(number).length() > 1) {
            number = String.valueOf(number)
                    .chars()
                    .map(Character::getNumericValue)
                    .sum();
        }

        return number;
    }

    public static int sumOfPrimeFactors(int number) {
        List<Integer> primeFactorsByMultiplicity = new ArrayList<>();

        for (int element = 2, temp = number; element < number; element++) {
            while (temp % element == 0 && isPrime(element)) {
                primeFactorsByMultiplicity.add(element);
                temp /= element;
            }
        }

        return primeFactorsByMultiplicity.stream()
                .reduce(0, Integer::sum)
                .intValue();
    }

    public static boolean isSmith(int number) {
        return digitalRoot(number) == digitalRoot(sumOfPrimeFactors(number));
    }

    public static String smithType(int number) {
        final String TRIVIAL_SMITH = "Trivial Smith";
        final String YOUNGEST_SMITH = "Youngest Smith";
        final String OLDEST_SMITH = "Oldest Smith";
        final String SINGLE_SMITH = "Single Smith";
        final String NOT_A_SMITH = "Not a Smith";

        if (isPrime(number)) {
            return TRIVIAL_SMITH;
        }

        if (isSmith(number)) {
            return isSmith(number + 1) ?
                    YOUNGEST_SMITH :
                    isSmith(number - 1) ? OLDEST_SMITH : SINGLE_SMITH;
        }

        return NOT_A_SMITH;
    }

    public static boolean oddOneOut(String[] arr) {
        Map<Integer, Integer> lengthsOccurencesMap = new HashMap<>();

        for (String word: arr) {
            lengthsOccurencesMap.put(
                    word.length(),
                    lengthsOccurencesMap.getOrDefault(word.length(), 0) + 1
            );
        }

        return lengthsOccurencesMap.entrySet().size() == 2 &&
                lengthsOccurencesMap.entrySet().stream().anyMatch(entry -> entry.getValue().intValue() == 1);
    }

    public static int longestRun(int[] arr) {
        int currentLength = 1;
        int lastRecordedDifference = Integer.MIN_VALUE;
        int maxLengthOfConsecutiveRun = Integer.MIN_VALUE;

        boolean isIncreasingOrDecreasingPattern;

        for (int index = 0; index < arr.length - 1; index++) {
            isIncreasingOrDecreasingPattern = (lastRecordedDifference != Integer.MIN_VALUE && (arr[index + 1] - arr[index]) == lastRecordedDifference) ||
                    (lastRecordedDifference == Integer.MIN_VALUE && Math.abs(arr[index + 1] - arr[index]) == 1);
            if (isIncreasingOrDecreasingPattern) {
                lastRecordedDifference = arr[index + 1] - arr[index];
                currentLength++;
            } else {
                maxLengthOfConsecutiveRun = Math.max(currentLength, maxLengthOfConsecutiveRun);
                currentLength = 1;
                lastRecordedDifference = Integer.MIN_VALUE;
            }
        }

        return Math.max(currentLength, maxLengthOfConsecutiveRun);
    }

    public static boolean isBalanced(String str) {
        ArrayDeque<Character> deque = new ArrayDeque<>();

        for (int i = 0; i < str.length(); i++) {
            char currentChar = str.charAt(i);

            if (currentChar == '(' || currentChar == '[' || currentChar == '{') {
                deque.push(currentChar);
                continue;
            }

            if (deque.isEmpty()) {
                return false;
            }

            // get top element and compare it with
            // current character, if the top element
            // is the correct closing pair then pop
            // it off the ArrayDeque datastructure
            char top = deque.peek();

            if ((currentChar == ')' && top == '(') || (currentChar == ']' && top == '[') || (currentChar == '}' && top == '{')) {
                deque.pop();
            } else {
                return false;
            }
        }

        return deque.isEmpty();
    }

    public static int findOdd(int[] arr) {
        Map<Integer, Integer> elementApperancesMap = new HashMap<>();

        for (int i = 0; i < arr.length; i++) {
            elementApperancesMap.put(arr[i], elementApperancesMap.getOrDefault(arr[i], 0) + 1);
        }

        return elementApperancesMap.entrySet()
                .stream()
                .filter(entry -> entry.getValue() % 2 != 0)
                .findFirst()
                .get().getKey();
    }

    /**
     * Consecutive Numbers
     * Create a function that determines whether elements in an array can
     * be re-arranged to form a consecutive list of numbers where each number appears exactly once.
     * [Consecutive Numbers](https://edabit.com/challenge/Md6usCHQ7Xsj2fQi3)
     * @param arr
     * @return {boolean}
     */
    public static boolean cons(int[] arr){
        int lowerBound = Arrays.stream(arr).min().getAsInt();
        int upperBound = Arrays.stream(arr).max().getAsInt();

        Set<Integer> conequtiveElementsSet = IntStream
                .rangeClosed(lowerBound, upperBound)
                .boxed()
                .collect(Collectors.toSet());

        Set<Integer> existingElementsSet = Arrays
                .stream(arr)
                .boxed()
                .collect(Collectors.toSet());

        if (arr.length != conequtiveElementsSet.size()) return false;
        return conequtiveElementsSet.size() == existingElementsSet.size();
    }

    /**
     * Carrying the Digits
     * https://edabit.com/challenge/5snfPLPbvjAsZ5kjo
     * @param n1
     * @param n2
     * @return {int}
     */
    public static int carryDigits(int n1, int n2) {
        String firstNumberAsStr = String.valueOf(n1), secondNumberAsStr = String.valueOf(n2);

        int lastCarry = 0, numberOfCarryTimes = 0, lhsOperand, rhsOperand, sum;
        int minimumNumberOfDigits = Math.min(String.valueOf(n1).length(), String.valueOf(n2).length());

        for (int i = 0; i < minimumNumberOfDigits; i++ ) {
            lhsOperand = Character.getNumericValue(firstNumberAsStr.charAt(firstNumberAsStr.length() - 1 - i));
            rhsOperand = Character.getNumericValue(secondNumberAsStr.charAt(secondNumberAsStr.length() - 1 - i));
            sum = lhsOperand + rhsOperand + lastCarry;

            if (sum >= 10) {
                numberOfCarryTimes++;
                lastCarry = sum / 10;
            }
        }

        return numberOfCarryTimes;
    }

    /**
     * Is One String in the Other?
     * Create a function that takes two strings and returns true if either of the
     * strings appears at the very end of the other string. Return false otherwise.
     * The character * is a wildcard, so it can take the place of any character.
     * [Is One String in the Other?](https://edabit.com/challenge/ZoDHtyWfFPttuTiQR)
     * @param str1
     * @param str2
     * @return {boolean}
     */
    public static boolean overlap(String str1, String str2) {
        int currentIndex, replacementIndex;
        StringBuilder firstStringBuilder = new StringBuilder(str1), secondStringBuilder = new StringBuilder(str2);

        for (int i = 0; i < Math.min(str1.length(), str2.length()); i++) {
            if (str1.charAt(str1.length() - 1 - i) == '*') {
                currentIndex = str1.length() - 1 - i;
                replacementIndex = str2.length() - 1 - i;
                firstStringBuilder.replace(currentIndex, currentIndex + 1, String.valueOf(str2.charAt(replacementIndex)));
            } else if (str2.charAt(str2.length() - 1 - i) == '*') {
                currentIndex = str2.length() - 1 - i;
                replacementIndex = str1.length() - 1 - i;
                secondStringBuilder.replace(currentIndex, currentIndex + 1, String.valueOf(str1.charAt(replacementIndex)));
            }
        }

        str1 = firstStringBuilder.toString().toLowerCase();
        str2 = secondStringBuilder.toString().toLowerCase();

        return str1.lastIndexOf(str2) == (str1.length() - str2.length()) ||
                str2.lastIndexOf(str1) == (str2.length() - str1.length());
    }

    /**
     * Balanced Words
     * https://edabit.com/challenge/NGnsMw8CG8gxEFW7w
     * @param word
     * @return {boolean}
     */
    public static boolean balanced(String word) {
        // If word is palindromic then it'll always have
        // balanced sum, hence we'll always return true
        if (new StringBuilder(word).reverse().toString().equals(word)) {
            return true;
        }

        int length = word.length();

        if (length % 2 == 0) {
            return word.substring(0, length / 2).chars().map(cp -> cp - 'a').sum() ==
                    word.substring(length / 2).chars().map(cp -> cp - 'a').sum();
        }

        return word.substring(0, length / 2).chars().map(cp -> cp - 'a').sum() ==
                word.substring(length / 2 + 1).chars().map(cp -> cp - 'a').sum();
    }

    /**
     * Triple + Double = So Much Trouble
     * https://edabit.com/challenge/27h4mwAKD3hhy6onh
     * Create a function that takes two integers and returns true if a number repeats
     * three times in a row at any place in num1 AND that same number repeats two times in a row in num.
     *
     * @param num1
     * @param num2
     * @return {boolean}
     */
    public static boolean trouble(long num1, long num2) {
        int consecutiveCount = 1;
        long currentDigit, lastSeenDigit = Long.MIN_VALUE;

        Set<Long> threeTimesInRow = new HashSet<>();

        do {
            currentDigit = num1 % 10;

            if (currentDigit == lastSeenDigit) {
                consecutiveCount++;
            }

            if (consecutiveCount == 3) {
                threeTimesInRow.add(currentDigit);
            }

            num1 /= 10;
            lastSeenDigit = currentDigit;
        } while (num1 != 0);


        lastSeenDigit = Long.MIN_VALUE;
        consecutiveCount = 1;

        do {
            currentDigit = num2 % 10;

            if (currentDigit == lastSeenDigit) {
                consecutiveCount++;
            }

            if (consecutiveCount == 2) {
                return threeTimesInRow.contains(currentDigit);
            }

            num2 /= 10;
            lastSeenDigit = currentDigit;
        } while (num2 != 0);

        return false;
    }

    /**
     * Contact List
     * Write a sorting function that takes in an array of names and
     * sorts them by last name either alphabetically (ASC) or reverse-alphabetically (DESC).
     * https://edabit.com/challenge/SnZ5y2hyxjZnWrMec
     *
     * @param arr
     * @param sortBy
     * @return {String[]}
     */
    public static String[] sortContacts(String[] arr, String sortBy) {
        if (arr == null || arr.length == 0) {
            return new String[]{};
        }

        final boolean ASC_SORTING = sortBy.equals("ASC");
        return Arrays.stream(arr).sorted((lhsName, rhsName) -> {
            int comparatorResult = lhsName.replaceAll(".*(?=\\s)\\s", "").compareTo(
                    rhsName.replaceAll(".*(?=\\s)\\s", "")
            );

            return ASC_SORTING ? comparatorResult : -1 * comparatorResult;
        }).toArray(String[]::new);
    }

    /**************************************************************
     **************************************************************/
    public static Map<Character, Integer> buildRepitionsCountMapping(String input) {
        int repititionCount = 1;
        Map<Character, Integer> consecutiveCharsWithLengthMapping = new HashMap<>();

        for (int index = 1; index < input.length(); index++) {
            if (input.charAt(index) == input.charAt(index - 1)) {
                repititionCount++;
            } else if (repititionCount > 1) {
                consecutiveCharsWithLengthMapping.put(input.charAt(index - 1), repititionCount);
                repititionCount = 1;
            }
        }

        if (repititionCount > 1) {
            consecutiveCharsWithLengthMapping.put(input.charAt(input.length() - 1), repititionCount);
        }

        return consecutiveCharsWithLengthMapping;
    }

    /**
     * Star Shorthand
     * Write a function that converts a string into star shorthand.
     * If a character is repeated n times, convert it into character*n.
     * https://edabit.com/challenge/6KPGPdQDCXsHYaQTL
     *
     * @param str
     * @return {String}
     */
    public static String toStarShorthand(String str) {
        StringBuilder resultBuilder = new StringBuilder("");
        Map<Character, Integer> repetitionsCountMap = buildRepitionsCountMapping(str);

        for (char repeatedChar: repetitionsCountMap.keySet()) {
            int repititionsCount = repetitionsCountMap.get(repeatedChar);

            String regex = new StringBuilder("(?<!\\*)")
                    .append(repeatedChar)
                    .append('{')
                    .append(repititionsCount)
                    .append('}')
                    .toString();

            String replacement = new StringBuilder(String.valueOf(repeatedChar))
                    .append('*')
                    .append(repetitionsCountMap.get(repeatedChar))
                    .toString();

            resultBuilder.append(str.replaceAll(regex, replacement));
        }

        return resultBuilder.toString();
    }
    /**************************************************************
     **************************************************************/
}
