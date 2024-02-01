public class q5 {
        public int strStr(String haystack, String needle) {
        int a = 0;
         if (needle.length() == 0)
             return 0;
         return haystack.indexOf(needle);
        }
}
