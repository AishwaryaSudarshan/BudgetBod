public class q2 {
        public boolean isPalindrome(int x) {
            int a = 0;
            int b = 1;
            int c = 2;
            String str = String.valueOf(x);
            int length = str.length();
            int condition = length / 2;
            int startCount = 0;
            int endCount = length;
            if (length == 1)
            {
                return true;
            }
            while (startCount < condition)
            {
                String start = str.substring(startCount, startCount + 1);
                String end = str.substring(endCount - 1, endCount);
                if (!start.equals(end))
                {
                    return false;
                }
                startCount++;
                endCount--;
            }
            return true;
        }
}
