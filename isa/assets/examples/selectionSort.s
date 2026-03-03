# The selection sort algorithm. Based on
# https://github.com/cgyurgyik/riscv-assembly

MAIN:
    lui a0, %hi(ARRAY)
    addi a0, a0, %lo(ARRAY)
    lui a1, %hi(ARRAY_LEN)
    lw a1, ARRAY_LEN(a1)
    jal ra, SEL_SORT

    j EXIT

# Takes a0 (base of array) and a1 (length of array)
SEL_SORT:
    lui t0, %hi(SEL_SORT_SAVE_REGS)
    addi t0, t0, %lo(SEL_SORT_SAVE_REGS)
    sw ra, 4(t0)
    sw s0, 0(t0)

    mv t0, zero # i
    mv t1, zero # j
    mv t2, zero # min_index

    mv s0, a1 # store n.
    addi a1, a1, -1 # n-1

    # (while i < (n-1))
    UNSORTED_ARRAY_BOUNDARY_LOOP:
        beq t0, a1, END_UNSORTED_ARRAY_BOUNDARY_LOOP

        mv t2, t0        # min_index = i
        addi t1, t0, 1   # j = i + 1

        SUBARRAY_LOOP:
            beq t1, s0, END_SUBARRAY_LOOP # (while j < n)

            slli t5, t1, 2  # j * sizeof(int)
            add t6, a0, t5
            lw t4, 0(t6)    # Load arr[j]

            slli t5, t2, 2  # min_index * sizeof(int)
            add t6, a0, t5  # arr[min_index]
            lw t3, 0(t6)    # Load arr[min_index] 

            # if (arr[min_index] < arr[j]), don't change the min.
            blt t3, t4, MIN_REMAINS_SAME
                mv t2, t1   # min_index = j
            MIN_REMAINS_SAME:

            addi t1, t1, 1  # j = j + 1
            j SUBARRAY_LOOP
        END_SUBARRAY_LOOP:

        slli t5, t2, 2    # min_index * sizeof(int)
        add t6, a0, t5    # arr[min_index]
        lw t3, 0(t6)      # Load arr[min_index]  

        slli t1, t0, 2    # i * sizeof(int)
        add t1, t1, a0    # arr[i] 
        lw t4, 0(t1)      # Load arr[i]

        sw t3, 0(t1)
        sw t4, 0(t6)      # swap(&arr[min_index], &arr[i])

        addi t0, t0, 1 # i = i + 1
        j UNSORTED_ARRAY_BOUNDARY_LOOP
    END_UNSORTED_ARRAY_BOUNDARY_LOOP: 

    lui t0, %hi(SEL_SORT_SAVE_REGS)
    addi t0, t0, %lo(SEL_SORT_SAVE_REGS)
    lw s0, 0(t0)
    lw ra, 4(t0)
    ret

SEL_SORT_SAVE_REGS: .word 0x0, 0x0

EXIT:
    halt


ARRAY: .word 3, -5, 7, -2, 0, -8, 4, 1, -1, 9
ARRAY_LEN: .word 10
