using System.Collections;
using System.Drawing;

public class LinkedList<T> : IEnumerable<T>
{
    private Node<T>? _first = null;
    private Node<T>? _last = null;
    private int _size = 0;

    public T? First
    {
        get => (_first != null) ? _first.Value : throw new Exception("The list is empty");
    }

    public T? Last
    {
        get => (_last != null) ? _last.Value : throw new Exception("The list is empty");
    }

    public T At(int index)
    {
        IndexCheck(index);
        return AtNode(index)?.Value ?? throw new Exception("");
    }

    public T? Find(Predicate<T> predicate)
    {
        var currentNode = _first;
        while (currentNode != null)
        {
            if (predicate(currentNode.Value)) return currentNode.Value;
            currentNode = currentNode.Next;
        }
        return default(T);
    }

    public void AddFirst(T value)
    {
        Node<T> node = new Node<T>(null, _first, value);
        if (_size == 0)
        {
            _first = node;
            _last = node;
            _size++;
            return;
        }
        _first.Prev = node;
        _first = node;
        _size++;
    }

    public void AddLast(T value)
    {
        Node<T> node = new Node<T>(null, _first, value);
        if (_size == 0)
        {
            _first = node;
            _last = node;
            _size++;
            return;
        }
        _last.Next = node;
        _last = node;
        _size++;
    }

    public void Insert(int index, T value)
    {
        Node<T>? position = AtNode(index);
        Node<T> node = new(position.Prev, position, value);
        position.Prev.Next = node;
        position.Prev = node;
        _size++;
    }

    public void Remove(T value)
    {
        var currentNode = _first;
        while (currentNode != null)
        {
            if(currentNode.Value == value)
            {
                currentNode.Prev.Next = currentNode.Next;
                currentNode.Next.Prev = currentNode.Prev;
                _size--;
                return;
            }
        }
        return;
    }

    public void RemoveFirst()
    {
        Node<T>? newFirst = _first?.Next;
        newFirst.Prev = null;
        _first = newFirst;
        _size--;
    }

    public void RemoveLast()
    {
        Node<T>? newLast = _last?.Prev;
        newLast.Next = null;
        _last = newLast;
        _size--;
    }

    public void RemoveAt(int index)
    {

    }

    private void IndexCheck(int index)
    {
        if (index < 0 || index >= _size) throw new Exception("Index is out of range");
    }

    private Node<T>? AtNode(int index)
    {
        IndexCheck(index);
        int current = 0;
        Node<T>? currentNode = _first;
        while (current != index)
        {
            currentNode = currentNode?.Next;
            current++;
        }
        return currentNode;
    }

    public IEnumerator<T> GetEnumerator()
    {
        return new LinkedListEnumerator(_first);
    }

    IEnumerator IEnumerable.GetEnumerator()
    {
        throw new NotImplementedException();
    }

    private class LinkedListEnumerator (Node<T>? current) : IEnumerator<T>
    {

        public T Current { get => current?.Value; }

        object? IEnumerator.Current => Current;

        private Node<T>? _initial = (current == null) ? null : new (current.Prev, current.Next, current.Value);

        public void Dispose()
        {

        }

        public bool MoveNext()
        {
            if(current?.Next == null) return false;
            current = current.Next;
            return true;
        }

        public void Reset()
        {
            current = _initial;
        }
    }
}