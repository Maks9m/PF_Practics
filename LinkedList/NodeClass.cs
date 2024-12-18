namespace ОП;
public class Node<T> (Node<T>? prev, Node<T>? next, T value)
{
    public Node<T>? Prev = prev; 
    public Node<T>? Next = next;
    public T Value = value;

    public bool IsLast { get; set; } = false;
}