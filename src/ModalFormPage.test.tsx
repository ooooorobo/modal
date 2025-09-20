import {afterEach, describe, expect, test} from "vitest";
import {userEvent} from "@testing-library/user-event";
import {act, render, screen, waitFor} from "@testing-library/react";
import ModalFormPage from "./ModalFormPage";

const user = userEvent.setup();
describe('FormModal', () => {
  
  afterEach(() => {
    // body 스타일 초기화
    document.body.style.overflow = 'unset';
  });
  
  describe('모달 닫기', () => {
    test('ESC 키로 모달을 닫을 수 있다', async () => {
      render(<ModalFormPage/>);
      
      const openButton = screen.getByTestId('open-modal-btn');
      await user.click(openButton);
      
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      
      await user.keyboard('{Escape}');
      
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });
    
    test('overlay 클릭으로 모달을 닫을 수 있다', async () => {
      render(<ModalFormPage/>);
      
      const openButton = screen.getByTestId('open-modal-btn');
      await user.click(openButton);
      
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      
      const overlay = screen.getByTestId('modal-overlay');
      await user.click(overlay);
      
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });
    
    test('모달 내용 클릭 시에는 모달이 닫히지 않는다', async () => {
      render(<ModalFormPage/>);
      
      const openButton = screen.getByTestId('open-modal-btn');
      await user.click(openButton);
      
      const modalTitle = screen.getByRole('heading');
      await user.click(modalTitle);
      
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });
  
  describe('포커스 흐름', () => {
    test('모달이 열리면 제목으로 포커스가 이동한다', async () => {
      render(<ModalFormPage/>);
      
      const openButton = screen.getByTestId('open-modal-btn');
      await user.click(openButton);
      
      const title = screen.getByRole('heading');
      expect(title).toHaveFocus();
    });
    
    test('모달이 닫히면 트리거 버튼으로 포커스가 돌아온다', async () => {
      render(<ModalFormPage/>);
      
      const openButton = screen.getByTestId('open-modal-btn');
      await user.click(openButton);
      
      await user.keyboard('{Escape}');
      
      await waitFor(() => {
        expect(openButton).toHaveFocus();
      });
    });
    
    test('Tab 키로 다음 요소로 이동할 수 있다', async () => {
      render(<ModalFormPage/>);
      
      const openButton = screen.getByTestId('open-modal-btn');
      await user.click(openButton);
      
      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const submitButton = screen.getByRole('button', {name: /submit/i});
      
      await user.tab();
      expect(nameInput).toHaveFocus();
      
      await user.tab();
      expect(emailInput).toHaveFocus();
      
      await user.tab();
      expect(submitButton).toHaveFocus();
    });
    
    test('Shift+Tab 키로 이전 요소로 이동할 수 있다', async () => {
      render(<ModalFormPage/>);
      
      const openButton = screen.getByTestId('open-modal-btn');
      await user.click(openButton);
      
      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      
      await user.tab();
      await user.tab();
      expect(emailInput).toHaveFocus();
      
      await user.tab({shift: true});
      expect(nameInput).toHaveFocus();
    });
  });
  
  describe('폼 사용성', () => {
    test('키보드만으로 입력하고 제출할 수 있다', async () => {
      render(<ModalFormPage/>);
      
      const openButton = screen.getByTestId('open-modal-btn');
      await user.click(openButton);
      
      await user.tab();
      await user.keyboard('John Doe');
      
      await user.tab();
      await user.keyboard('john@example.com');
      
      await user.tab();
      await user.keyboard('{Enter}');
      
      await waitFor(() => {
        expect(screen.getByTestId('result')).toHaveTextContent('{"email":"john@example.com","name":"John Doe"}');
      });
    });
    
    test('이메일 유효성 검증 실패 시 오류 메시지가 표시된다', async () => {
      render(<ModalFormPage/>);
      
      const openButton = screen.getByTestId('open-modal-btn');
      await user.click(openButton);
      
      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const submitButton = screen.getByRole('button', {name: /submit/i});
      
      await user.type(nameInput, 'John Doe');
      await user.type(emailInput, 'invalid-email');
      await user.click(submitButton);
      
      await waitFor(() => {
        const errorMessage = screen.getByRole('alert');
        expect(errorMessage).toHaveTextContent('Email is invalid');
        expect(errorMessage).toHaveAttribute('aria-live', 'polite');
      });
      
      expect(emailInput).toHaveAttribute('aria-invalid', 'true');
      expect(emailInput).toHaveAttribute('aria-describedby', 'email-error');
    });
    
    test('필수 필드 누락 시 오류 메시지가 표시된다', async () => {
      render(<ModalFormPage/>);
      
      const openButton = screen.getByTestId('open-modal-btn');
      await user.click(openButton);
      
      const submitButton = screen.getByRole('button', {name: /submit/i});
      await user.click(submitButton);
      
      await waitFor(() => {
        const errors = screen.getAllByRole('alert');
        expect(errors).toHaveLength(2);
        expect(errors[0]).toHaveTextContent('Name is required');
        expect(errors[1]).toHaveTextContent('Email is required');
      });
    });
  });
  
  describe('UI/UX', () => {
    test('모달이 열려 있을 때 배경 스크롤이 막힌다', async () => {
      render(<ModalFormPage/>);
      
      const openButton = screen.getByTestId('open-modal-btn');
      await user.click(openButton);
      
      expect(document.body.style.overflow).toBe('hidden');
    });
    
    test('모달이 닫히면 배경 스크롤이 복원된다', async () => {
      render(<ModalFormPage/>);
      
      const openButton = screen.getByTestId('open-modal-btn');
      await user.click(openButton);
      
      await user.keyboard('{Escape}');
      
      await waitFor(() => {
        expect(document.body.style.overflow).toBe('unset');
      });
    });
    
    test('모달 컨텐츠에 스크롤 가능한 스타일이 적용된다', async () => {
      render(<ModalFormPage/>);
      
      const openButton = screen.getByTestId('open-modal-btn');
      await user.click(openButton);
      
      const modalContent = document.querySelector('.modal-content');
      expect(modalContent).toHaveStyle({
        'max-height': '80vh',
        'overflow-y': 'auto'
      });
    });
  });
  
  describe('접근성', () => {
    test('모달에 올바른 ARIA 속성이 적용된다', async () => {
      render(<ModalFormPage/>);
      
      const openButton = screen.getByTestId('open-modal-btn');
      await user.click(openButton);
      
      const modal = screen.getByRole('dialog');
      expect(modal).toHaveAttribute('aria-modal', 'true');
      expect(modal).toHaveAttribute('aria-labelledby', 'modal-title');
      expect(modal).toHaveAttribute('aria-describedby', 'modal-description');
    });
    
    test('제목과 설명 요소가 올바른 ID를 가진다', async () => {
      render(<ModalFormPage/>);
      
      const openButton = screen.getByTestId('open-modal-btn');
      await user.click(openButton);
      
      expect(screen.getByRole('heading')).toHaveAttribute('id', 'modal-title');
      expect(screen.getByText('Please fill out the form below.')).toHaveAttribute('id', 'modal-description');
    });
    
    test('폼 요소들이 접근성 속성을 가진다', async () => {
      render(<ModalFormPage/>);
      
      const openButton = screen.getByTestId('open-modal-btn');
      await user.click(openButton);
      
      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      
      expect(nameInput).toHaveAttribute('id', 'name');
      expect(emailInput).toHaveAttribute('id', 'email');
    });
  });
  
  describe('선언적 호출', () => {
    test('openModal 함수가 Promise를 반환한다', async () => {
      render(<ModalFormPage/>);
      
      const openButton = screen.getByTestId('open-modal-btn');
      
      let modalPromise;
      act(() => {
        modalPromise = user.click(openButton);
      });
      
      expect(modalPromise).toBeInstanceOf(Promise);
    });
    
    test('제출 완료 시 입력값이 반환된다', async () => {
      render(<ModalFormPage/>);
      
      const openButton = screen.getByTestId('open-modal-btn');
      await user.click(openButton);
      
      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const submitButton = screen.getByRole('button', {name: /submit/i});
      
      await user.type(nameInput, 'John Doe');
      await user.type(emailInput, 'john@example.com');
      await user.click(submitButton);
      
      await waitFor(() => {
        const result = screen.getByTestId('result');
        expect(result).toHaveTextContent('{"email":"john@example.com","name":"John Doe"}');
      });
    });
    
    test('취소 시 null이 반환된다', async () => {
      render(<ModalFormPage/>);
      
      const openButton = screen.getByTestId('open-modal-btn');
      await user.click(openButton);
      
      const cancelButton = screen.getByRole('button', {name: /cancel/i});
      await user.click(cancelButton);
      
      await waitFor(() => {
        expect(screen.queryByTestId('result')).not.toBeInTheDocument();
      });
    });
    
    test('ESC로 닫을 시 null이 반환된다', async () => {
      render(<ModalFormPage/>);
      
      const openButton = screen.getByTestId('open-modal-btn');
      await user.click(openButton);
      
      await user.keyboard('{Escape}');
      
      await waitFor(() => {
        expect(screen.queryByTestId('result')).not.toBeInTheDocument();
      });
    });
  });
  
  describe('통합 테스트', () => {
    test('전체 모달 플로우가 정상 작동한다', async () => {
      render(<ModalFormPage/>);
      
      // 1. 모달 열기
      const openButton = screen.getByTestId('open-modal-btn');
      await user.click(openButton);
      
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByRole('heading')).toHaveFocus();
      expect(document.body.style.overflow).toBe('hidden');
      
      // 2. 폼 작성
      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      
      await user.tab();
      await user.type(nameInput, 'Jane Smith');
      await user.tab();
      await user.type(emailInput, 'jane@example.com');
      
      // 3. 제출
      const submitButton = screen.getByRole('button', {name: /submit/i});
      await user.click(submitButton);
      
      // 4. 결과 확인
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        expect(screen.getByTestId('result')).toHaveTextContent('{"email":"jane@example.com","name":"Jane Smith"}');
        expect(openButton).toHaveFocus();
        expect(document.body.style.overflow).toBe('unset');
      });
    });
  });
});