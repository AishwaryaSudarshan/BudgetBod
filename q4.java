import java.util.*;
//this is a change made by andrew
public class q4 {
    public boolean isValid(String s) {
    Stack <String> stack = new Stack<String>();
    int paraS = 0;
    int paraE = 0;
    int barS = 0;
    int barE = 0;
    int harS = 0;
    int harE = 0;
    for (int i = 0; i < s.length(); i++)
    {
        if (s.substring(i, i + 1).equals("("))
        {
            stack.push(s.substring(i, i + 1));
            paraS++;
        }
        else if (s.substring(i, i + 1).equals("{"))
        {
            stack.push(s.substring(i, i + 1));
            barS++;
        }
        else if (s.substring(i, i + 1).equals("["))
        {
            stack.push(s.substring(i, i + 1));
            harS++;
        }
        
            else if (s.substring(i, i + 1).equals(")"))
            {
                if (stack.size() != 0 && stack.peek().equals("("))
                    stack.pop();
                paraE++;
            }
            else if (s.substring(i, i + 1).equals("}"))
            {
                if (stack.size() != 0 && stack.peek().equals("{"))
                    stack.pop();
                barE++;
            }   
            else if (s.substring(i, i + 1).equals("]"))
            {
                if (stack.size() != 0 && stack.peek().equals("["))
                    stack.pop();
                harE++;
            }
            else
                return false;
    
    }
    if (stack.size() == 0 && paraS == paraE && barS == barE && harS == harE)
        return true;
    
    return false;

}   
}
