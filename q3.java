public class q3 {
        public int romanToInt(String s) {
        int sum = 0;
        for (int i = 0; i < s.length(); i++)
        {
            String a = s.substring(i, i + 1);
            String b = "";
            if (i + 1 != s.length())
                b = s.substring(i + 1, i + 2);
            if (a.equals("I") && b.equals("V"))
            {
                sum += 4;
                i++;
            }
            else if (a.equals("I") && b.equals("X"))
            {
                sum += 9;
                i++;
            }
            else if (a.equals("X") && b.equals("L"))
            {
                sum += 40;
                i++;
            }
            else if (a.equals("X") && b.equals("C"))
            {
                sum += 90;
                i++;
            }
            else if (a.equals("C") && b.equals("D"))
            {
                sum += 400;
                i++;
            }
            else if (a.equals("C") && b.equals("M"))
            {
                sum += 900;
                i++;
            }
            else if (a.equals("M"))
            {
                sum += 1000;
            }
            else if (a.equals("D"))
            {
                sum += 500;
            }
            else if (a.equals("C"))
            {
                sum += 100;
            }
            else if (a.equals("L"))
            {
                sum += 50;
            }
            else if (a.equals("X"))
            {
                sum += 10;
            }
            else if (a.equals("V"))
            {
                sum += 5;
            }
            else 
            {
                sum++;
            }
        }
        return sum;    
        }
}
